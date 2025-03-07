import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { useUser } from '../../../state/store/user'
import responsive from '../../../helpers/responsive'
import { MotiView } from 'moti'
import { IconImage } from '../../../helpers/GetIcons'
import Animated from 'react-native-reanimated'
import LottiHosre from '../../auth/component/LottiHosre'
interface PlayerProps {
    isLeft: boolean,
    thinking: boolean,
    user: any,
    image: any
}
export default function Player({ isLeft = false, thinking, user, image }: PlayerProps) {
    const { styles, theme } = useStyles(unistyles)
    const horseSize = 80
    return (
        <View style={{ flexDirection: 'row' }}>
            {
                isLeft && thinking && <View style={[styles.lottie,
                {
                    transform: [{
                        rotateY: '180deg'
                    }]
                }
                ]}>
                    <LottiHosre
                        size={horseSize}
                        autoPlay
                        loop
                    />
                </View>
            }

            <View style={{ justifyContent: 'flex-end' }}>
                <Animated.View
                    style={styles.container(isLeft)}>
                    <Image
                        source={image}
                        style={styles.image(30)}
                    />
                    <View>
                        <Text>{user?.name}</Text>
                        <Text style={styles.text(13, '500', theme.colors.primary)}>{user?.email}</Text>
                    </View>

                </Animated.View>
            </View>
            {
                !isLeft && thinking && <View style={[styles.lottie,

                ]}>
                    <LottiHosre
                        size={horseSize}
                        autoPlay
                        loop
                    />
                </View>
            }

        </View>

    )
}

const unistyles = createStyleSheet((theme, rtl) => {
    return {
        container: (value: boolean) => ({
            backgroundColor: theme.colors.background,
            padding: 10,
            gap: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: value ? 'flex-start' : 'flex-end'
        }),
        image: (value: number) => ({
            width: responsive.width(value),
            height: responsive.height(value),
        }),
        lottie: {
            backgroundColor: theme.colors.lightbackground
        },
        text: (fontSize: number, fontWeight: any, color: string) => {
            return (
                {
                    fontWeight: fontWeight,
                    fontSize: responsive.fontSize(fontSize),
                    color: color
                }
            )
        }
    }
})
