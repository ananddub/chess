import { View } from "moti";
import { JSX, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Chessboard from "react-native-chessboardjs";
import { Piece, Square } from "react-native-chessboardjs/lib/typescript/src/@types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

function Test(): JSX.Element {
    const [optionSquares, setOptionSquares] = useState({});
    const [moveFrom, setMoveFrom] = useState('');

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const resetFirstMove = (square: Square) => {
        const hasOptions = getMoveOptions(square);
        if (hasOptions) {
            setMoveFrom(square);
        }
    };

    const getMoveOptions = (square: Square) => {
        return true;
    };

    return (
        <Chessboard

            customBoardStyle={{
            }}
            onPieceDrop={(
                sourceSquare: Square,
                targetSquare: Square,
                piece: Piece,
            ) => {
                try {

                    setMoveFrom('');
                    setOptionSquares({});
                    return true;
                } catch (e) { }
                return false;
            }}
            onSquareClick={(square: Square) => {
                if (!moveFrom) {
                    resetFirstMove(square);
                    return false;
                }

                try {

                    setMoveFrom('');
                    setOptionSquares({});
                    return true;
                } catch (e) {
                    // invalid move
                    resetFirstMove(square);
                }
                return false;
            }}
            isDraggablePiece={({ piece }) => {
            }}
            // if a user makes an invalid move attempt they will still see the modal
            // validating moves for promo check requires a bit more work than
            // we show in this example. the if statement can be extended as needed
            onPromotionCheck={(sourceSquare, targetSquare, piece) => {
                if (
                    (piece === 'wp' &&
                        sourceSquare[1] === '7' &&
                        targetSquare[1] === '8') ||
                    (piece === 'bp' &&
                        sourceSquare[1] === '2' &&
                        targetSquare[1] === '1')
                ) {
                    // continue...
                    // check square range diff
                    return (
                        Math.abs(
                            sourceSquare.charCodeAt(0) - targetSquare.charCodeAt(0),
                        ) <= 1
                    );
                }
                return false;
            }}
        />
    );
}

const styles = StyleSheet.create({
    customDarkSquareStyle: {
        backgroundColor: '#D2691E',
    },
    customLightSquareStyle: {
        backgroundColor: '#DEB887',
    },
    sectionContainer: {
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Test;
