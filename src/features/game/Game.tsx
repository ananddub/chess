
import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {

    const chessboardRef = useRef<ChessboardRef>(null);

    useEffect(() => {
        (async () => {
            await chessboardRef.current?.move({ from: 'e2', to: 'e4' });
            await chessboardRef.current?.move({ from: 'e7', to: 'e5' });
            await chessboardRef.current?.move({ from: 'd1', to: 'f3' });
            await chessboardRef.current?.move({ from: 'a7', to: 'a6' });
            await chessboardRef.current?.move({ from: 'f1', to: 'c4' });
            await chessboardRef.current?.move({ from: 'a6', to: 'a5' });
        })();
    }, []);


    return (<GestureHandlerRootView style={styles.container} >
        <View
            style={{
                pointerEvents: 'auto'
            }}
        >
            <Chessboard
                ref={chessboardRef}
                onMove={(move) => console.log(move)}
            />
        </View>
    </GestureHandlerRootView>
    )
};

export default App;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
}) 
