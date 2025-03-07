import { View, useWindowDimensions } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import UnFocused from './UnFocused';
import Focused from './Focused';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import responsive from '../helpers/responsive';

export default function CustomTab(props: BottomTabBarProps) {
    const { state, descriptors, insets, navigation } = props;
    const { styles, theme } = useStyles(unistyles);

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, { merge: true });
                    }
                };

                return <View key={route.key} style={styles.touchable}>
                    {
                        isFocused ?
                            (<Focused route={route.name} color={theme.colors.secondary} />)
                            : (
                                <UnFocused
                                    onPress={onPress}
                                    route={route.name}
                                    color={theme.colors.lightsecondary(0.35)}
                                />
                            )
                    }
                </View>
            })}
        </View>
    );
}

const unistyles = createStyleSheet((theme, runtime) => ({
    container: {
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: responsive.padding(13),
        paddingHorizontal: responsive.padding(20),
        height: runtime.screen.height * 0.09,
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
