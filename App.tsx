import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import './src/unistyles/unistyles';
import SocketProvider from './src/state/context/SocketContext';
import axios from 'axios';
import { Config } from './src/config/config';
import RotateProveder from './src/state/context/chessrotate';

const App = () => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <RotateProveder>
                <SocketProvider>
                    <Navigation />
                </SocketProvider>
            </RotateProveder>
        </GestureHandlerRootView>
    );
};

export default App;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
