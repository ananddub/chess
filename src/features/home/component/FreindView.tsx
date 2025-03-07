import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import responsive from '../../../helpers/responsive'
import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://api.freeapi.app/api/v1/public/randomusers',
    params: { page: '1', limit: '9' },
    headers: { accept: 'application/json' }
};
export default function FreindView() {
    const { styles, theme } = useStyles(unistyles)
    const [value, setValue] = useState<any[]>([])
    const getData = async () => {
        try {
            const { data } = await axios.request(options);
            // console.log(data.data.data)
            setValue(data.data.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <View>
            <View style={styles.flexrow}>
                <Text style={styles.text(18, 'bold', 'black')}>Freinds</Text>
                <Text style={styles.text(14, '500', 'black')}>Show All</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={value}
                renderItem={({ item }) => (
                    <View style={styles.conatianer}>
                        <Image
                            source={{ uri: item?.picture?.thumbnail as string }}
                            style={styles.image(70)}
                        />
                        <View style={styles.name}>
                            <Text style={styles.text(13, '600', 'black')}>{item?.name?.first} </Text>
                            <Text style={styles.text(13, '600', 'black')}>{item.name.last}</Text>
                        </View>
                        <Text style={styles.text(11, '400', theme.colors.primary)}> offline 4 hours ego </Text>

                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.text(15, 'bold', 'black')}>Challenge</Text>
                        </TouchableOpacity>
                    </View>
                )}

            />
        </View>
    )
}

const unistyles = createStyleSheet((theme, rtl) => {
    return {
        flexrow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        image: (value: number) => ({
            width: responsive.width(value),
            height: responsive.height(value),
        }),
        conatianer: {
            marginRight: 10,
            padding: 10,
            width: responsive.width(150),
            height: responsive.height(200),
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            backgroundColor: theme.colors.background,
        },
        button: {
            backgroundColor: '#ebedee',
            paddingVertical: 13,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        name: {
            gap: 5,
            flexDirection: 'row'
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

    }
})
