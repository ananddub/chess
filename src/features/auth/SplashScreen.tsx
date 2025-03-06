import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import LottiHosre from './component/LottiHosre'
import responsive from '../../helpers/responsive'
import { navigate } from '../../helpers/NavigationUtil'

export default function SplashScreen() {
    const { styles, theme } = useStyles(unistyles)
    useEffect(() => {
        setTimeout(() => {
            navigate('login')
        }, 2000)
    }, [])
    return (
        <View style={styles.container}>
            <LottiHosre
                size={10}
                autoPlay
                loop
                style={styles.horse}
            />
        </View>
    )
}

const unistyles = createStyleSheet((theme, rtl) => {
    return {
        container: {
            flex: 1,
            width: rtl.screen.width,
            height: rtl.screen.height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background
        },
        horse: {
            width: rtl.screen.width - responsive.width(200),
            height: rtl.screen.height
        }
    }
}) 
