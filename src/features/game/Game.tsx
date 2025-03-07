
import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Player from './component/Player';
import { IconImage } from '../../helpers/GetIcons';
import { useRotate } from '../../state/context/chessrotate';
import { useSocket } from '../../state/context/SocketContext';
import { Channels, GameStatus, TURN } from '../../constant/game';
import { register } from '../../service/chess';
import { useUser } from '../../state/store/user';

const Game = () => {

    const chessboardRef = useRef<ChessboardRef>(null);
    const { setRotate } = useRotate()
    const { styles } = useStyles(unistyles);
    const { user, setStatus } = useUser()
    const [myPiece, setMyPiec] = useState<any>(null)
    const [data, setData] = useState<any>(null)
    const { socketref } = useSocket()
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        const io = socketref?.current
        register({ id: user?._id ?? '' })
        setStatus(GameStatus.PENDING)
        io?.on(Channels.ON_PROGRESS, (msg: any) => {
            try {
                const { value } = msg;
                const turn = value.player1.user === user?._id ? value.player1.turn : value.player2.turn
                console.log(Channels.ON_PROGRESS, value)
                setMyPiec(turn)
                setData(value)
            } catch (err) {
                console.log(err)
            }
        })

        return () => {
            io?.off(Channels.ON_PROGRESS)
        }
    }, [flag])
    useEffect(() => {
        const io = socketref?.current
        if (!data) return;
        const send_players = `${Channels.ON_MATCH}_${data._id}_players`;
        io?.on(send_players, (value: any) => {

            const obj = {
                from: value?.value.moves?.from,
                to: value?.value.moves?.to
            }
            console.log(send_players, obj)
            chessboardRef.current?.move(obj)
        })
        return () => {
            io?.off(send_players)
        }
    }, [data])
    const onMove = (move: any) => {
        if (!data) {
            console.log('cannot move data is null')
            return
        }
        const obj = {
            state: move.state,
            moves: move.move,
            groupId: data._id,
            to: data._id,
            turn: myPiece,
            value: {
                moves: move.move,
                state: move.state,
            }
        }
        socketref?.current?.emit(Channels.ON_MATCH, JSON.stringify(obj))
    }
    return (
        <View
            style={styles.container}
        >
            <View style={styles.paddingRight} >
                <Player
                    isLeft={false}
                    thinking={true}
                    user={{ name: 'Hosre', email: 'h@h.com' }}
                    image={IconImage.fill_queens}
                />
            </View>

            <Chessboard
                ref={chessboardRef}
                onMove={onMove}

            />


            <View style={styles.paddingLeft} >
                <Player
                    isLeft
                    thinking={false}
                    user={{ name: 'Test', email: 'h@h.com' }}
                    image={IconImage.fill_pawn}
                />
            </View>
        </View>
    )
};

export default Game;

export const unistyles = createStyleSheet((theme, rtl) => ({
    container: {
        flex: 1,
        height: rtl.screen.height,
        width: rtl.screen.width,
        gap: 20,
        backgroundColor: theme.colors.lightbackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paddingRight: {
        width: rtl.screen.width,
        alignItems: 'flex-start'
    },
    paddingLeft: {
        width: rtl.screen.width,
        alignItems: 'flex-end',

    }
}))
