import { View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Ionicons, MaterialCommunityIcons } from '../../constant/Icons';
import responsive from '../../helpers/responsive';
import Header from './component/Header';
import Card from './component/Card';
import FreindView from './component/FreindView';
import { useSocket } from '../../state/context/SocketContext';
import { Channels } from '../../constant/game';
import { useUser } from '../../state/store/user';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigate } from '../../helpers/NavigationUtil';

export default function Home() {
    const { styles } = useStyles(unistyle);
    const { user } = useUser(state => state);
    const { socketref } = useSocket();
    useEffect(() => {
        navigate('Game')
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.paddingInset} />
            <Header />
            <ScrollView
                style={styles.scorllcontainer}
                showsVerticalScrollIndicator={false}>
                <View>
                    <Card header="Play Online" text="10 min vs Random" />
                    <Card header="Play Offline" text="10 min vs Random" />
                    <Card header="Play a Bot" text="Martin M. Martin - Friendly" />
                </View>
                <View>
                    <FreindView />
                </View>
                <View style={{ marginTop: responsive.margin(10) }}>
                    <Card header="Daily Puzzle" text="10 min vs Random" />
                    <Card header="Play Coach" text="10 min vs Random" />
                    <Card header="Next Lesson" text="Martin M. Martin - Friendly" />
                </View>
            </ScrollView>
        </View>
    );
}

const unistyle = createStyleSheet((theme, rlt) => {
    console.log(rlt);
    return {
        container: {
            backgroundColor: theme.colors.background,
            height: rlt.screen.height,
            width: rlt.screen.width,
        },
        paddingInset: {
            paddingTop: rlt.insets.top,
        },
        scorllcontainer: {
            backgroundColor: '#ebedee',
            paddingTop: 10,
            gap: 10,
            flex: 1,
            paddingHorizontal: responsive.padding(10),
            marginBottom: rlt.screen.height * 0.08,
        },
    };
});
