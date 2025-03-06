import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { IconImage } from '../helpers/GetIcons';
import responsive from '../helpers/responsive';
import Animated from 'react-native-reanimated';
import { MotiView } from 'moti';
import { createStyleSheet } from 'react-native-unistyles';
interface Props {
    route: string;
    color: string;
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
export default function Focused({ color, route }: Props) {
    const size = 25
    const { width } = useWindowDimensions()
    return (<View style={{
        gap: 4,
        alignItems: 'center',
        flex: 1,
    }}>
        {
            route === 'home' &&
            <Icons image={IconImage.fill_chess}
                color={color}
                size={size}
            />
        }
        {
            route === 'freind' &&
            <Icons image={IconImage.fill_pawn}
                color={color}
                size={size}
            />
        }
        {
            route === 'group' &&
            <Icons image={IconImage.fill_member}
                color={color}
                size={size}
            />
        }
        {
            route === 'toplist' &&
            <Icons image={IconImage.fill_queen}
                color={color}
                size={size}
            />
        }
        <MotiView
            from={{
                width: 0
            }}
            animate={{
                width: (width / 4.5) / 2.2
            }}
            transition={{ type: 'timing' }}
            style={styles.bar(color)}
        />
    </View>)
}

const styles = createStyleSheet({

    bar: (color: string) => ({
        backgroundColor: color,
        borderRadius: 100,
        height: 3
    })
})
