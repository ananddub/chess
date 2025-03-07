import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { IconImage } from '../helpers/GetIcons';
import responsive from '../helpers/responsive';
import { Image } from 'moti';
import { MotiPressable } from 'moti/interactions';
interface Props {
    route: string;
    color: string;
    onPress: () => void
}

function Icons({ image, color, size }: {
    image: any
    color: string,
    size: number
}) {
    return (
        <Image
            source={image}
            style={{
                width: responsive.width(size),
                height: responsive.height(size),
                tintColor: color
            }}
        />

    )

}
export default function UnFocused({ onPress, route, color }: Props) {
    const size = 25
    const animatePress = useMemo(
        () => ({ hovered, pressed }: any) => {
            'worklet'

            return {
            }
        },
        []
    )
    return (
        <View
            style={{ flex: 1, alignItems: 'center' }}
        >
            <MotiPressable
                onPress={onPress}
                animate={animatePress}
            >
                {
                    route === 'home' &&
                    <Icons image={IconImage.out_chess}
                        color={color}
                        size={size}
                    />
                }
                {
                    route === 'freind' &&
                    <Icons image={IconImage.out_pawn}
                        color={color}
                        size={size}
                    />
                }
                {
                    route === 'group' &&
                    <Icons image={IconImage.out_member}
                        color={color}
                        size={size}
                    />
                }
                {
                    route === 'toplist' &&
                    <Icons image={IconImage.out_queen}
                        color={color}
                        size={size}
                    />
                }
            </MotiPressable>
        </View>

    );
}

const styles = StyleSheet.create({});
