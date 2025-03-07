import { Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import responsive from '../../../helpers/responsive'
import { MotiPressable } from 'moti/interactions'

interface Props {
    header: string,
    text: string
    onPress?: () => void

}

export default function Card({ header, text, onPress }: Props) {
    const { styles, theme } = useStyles(unistyles)
    const animatePress = useMemo(
        () => ({ hovered, pressed }: any) => {
            'worklet'
            return {
                scale: hovered || pressed ? 0.98 : 1,
            }
        },
        []
    )
    return (
        <MotiPressable
            animate={animatePress}
            onPress={() => onPress && onPress()}
            style={styles.container}>
            <View >
                <Image
                    source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/AAA_SVG_Chessboard_and_chess_pieces_03.svg/2048px-AAA_SVG_Chessboard_and_chess_pieces_03.svg.png'
                    }}
                    style={styles.image(110)}
                />
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.text(20, 'bold', theme.colors.lightsecondary(0.8))}>
                    {header}
                </Text>
                <Text style={styles.text(13, '500', theme.colors.primary)}>
                    {text}
                </Text>
            </View>
        </MotiPressable>
    )
}

const unistyles = createStyleSheet((theme) => ({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        gap: 10,
        width: '100%',
        borderRadius: responsive.borderRadius(4),
        marginBottom: responsive.margin(10)
    },
    image: (value: number) => ({
        width: responsive.width(value),
        height: responsive.height(value),
        resizeMode: 'contain',
    }),
    textcontainer: {
        justifyContent: 'center',
        gap: 7,
        flex: 1
    },
    text: (
        fontsize: number,
        fontweight: any,
        color: string
    ) => {
        return (
            {
                fontWeight: fontweight,
                fontSize: responsive.fontSize(fontsize),
                color: color,
            }
        )
    }
})) 
