import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { IconLotiee } from '../../../helpers/GetIcons'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import responsive from '../../../helpers/responsive'
interface Props {
    size: number,
    autoPlay?: boolean
    loop?: boolean,
    style?: ViewStyle
}
export default function LottiHosre({ size, style, autoPlay = false, loop = false }: Props) {
    const { styles } = useStyles(unistyles)
    return (
        <LottieView
            source={IconLotiee.horse}
            style={style ? style : styles.container(size)}
            resizeMode="contain"
            autoPlay={autoPlay}
            loop={loop}
        />
    )
}

const unistyles = createStyleSheet((theme, rlt) => {
    return {
        container: (value: number) => ({
            width: responsive.width(value),
            height: responsive.height(value),

        })
    }
})
