import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '../../../constant/Icons'
import responsive from '../../../helpers/responsive'
import { useUser } from '../../../state/store/user'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Image } from 'moti'
import LottiHosre from '../../auth/component/LottiHosre'
import { IconImage } from '../../../helpers/GetIcons'

export default function Header() {
    const { user } = useUser(state => state)
    const { styles, theme } = useStyles(unistyles)
    console.log(user)
    return (
        <View style={styles.container}>
            <View style={styles.userprofile}>
                {
                    user?.image ?
                        <Image
                            source={{ uri: user?.image }}
                            style={{
                                width: responsive.width(50),
                                height: responsive.height(50),
                                borderRadius: responsive.width(50) / 2
                            }}
                        />
                        :
                        <Image
                            source={IconImage.fill_queens}
                            style={styles.image(30)}
                        />
                }
                <View>
                    <Text style={styles.text(15)} >{user?.name}</Text>
                    <Text style={[styles.text(10), { color: theme.colors.primary }]} >{user?.email}</Text>
                </View>
            </View>



            <MaterialCommunityIcons
                name="bell-outline"
                size={responsive.fontSize(23)}
                color={theme.colors.lightsecondary(0.8)}
            />
        </View>
    )
}

const unistyles = createStyleSheet((theme, runtime) => ({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsive.padding(13),
        paddingBottom: responsive.padding(10),
        borderBottomColor: theme.colors.lightsecondary(0.4),
        borderBottomWidth: runtime.hairlineWidth,
    },
    text: (value: number) => ({
        fontSize: responsive.fontSize(value),
        color: 'black',
    }),
    userprofile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    image: (value: number) => ({
        width: responsive.width(value),
        height: responsive.height(value),
        borderRadius: responsive.width(50) / 2
    })
}))
