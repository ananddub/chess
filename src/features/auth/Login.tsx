import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Pressable, TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik';
import * as Yup from 'yup';
import responsive from '../../helpers/responsive'
import { navigate } from '../../helpers/NavigationUtil';
import LottiHosre from './component/LottiHosre';
import Ionicons from 'react-native-vector-icons/Ionicons';
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});
export default function Login() {
    const { styles, theme } = useStyles(stylesheet);
    const [focused, setFocused] = useState<null | string>(null);
    const [onLoading, setLoading] = useState<boolean>(false)
    const [emailerror, setEmailError] = useState<string>();

    const handleSubmit = (values: { email: string, password: string }) => {
        try {
            setLoading(true)

        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    const iconActiveColor = (focused: boolean) => {
        if (focused) {
            return theme.colors.primary
        } else {
            return theme.colors.lightsecondary(0.3)
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>

                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <LottiHosre size={80} />
                        </View>

                        <Text style={styles.title}>Sign in to your Account</Text>
                        <Text style={styles.subtitle}>
                            Enter your email and password to log in into your account
                        </Text>
                    </View>

                    <View style={{ gap: 10 }}>
                        <View style={styles.inputCn}>
                            <Text style={styles.inputText}>Email</Text>
                            <View style={{ gap: 6 }}>
                                <View style={styles.inputContainer(focused === 'email')}>
                                    <Ionicons name="mail-outline" size={responsive.fontSize(17)}
                                        color={iconActiveColor(focused === "email")}
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your email"
                                        onChangeText={() => {
                                            handleChange('email')
                                            setEmailError('')
                                        }}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => {
                                            handleBlur('email')
                                            setFocused(null)
                                        }}
                                        value={values.email}
                                    />
                                </View>
                                {(touched.email && errors.email) && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                                {(emailerror) && (
                                    <Text style={styles.errorText}>{emailerror}</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.inputCn}>
                            <Text style={styles.inputText}>Password</Text>
                            <View style={{ gap: 6 }}>

                                <View style={styles.inputContainer(focused === 'password')}>
                                    <Ionicons name="lock-closed-outline" size={responsive.fontSize(17)}
                                        color={iconActiveColor(focused === "password")}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your password"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onFocus={() => setFocused('password')}
                                        onBlur={() => {
                                            handleBlur('password')
                                            setFocused(null)
                                        }}
                                        value={values.password}
                                    />
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                    {
                        onLoading ?
                            <View style={styles.loader}>
                                <View style={{ transform: [{ translateY: -responsive.height(50) / 5 }] }}>
                                    <LottiHosre size={60} autoPlay loop />
                                </View>
                            </View> :
                            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                                <Text style={styles.loginText}>Log In</Text>
                            </TouchableOpacity>
                    }



                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { navigate('signup') }}
                        style={styles.bottom}>
                        <Text style={styles.signupText}>
                            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
                        </Text>


                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}

const stylesheet = createStyleSheet((theme, rtl) => ({
    container: {
        flex: 1,
        padding: responsive.padding(20),
        paddingTop: rtl.insets.top,
        backgroundColor: theme.colors.background,
        gap: 10,
    },
    logo: (value: number) => ({
        width: responsive.width(value),
        height: responsive.height(value),
        marginVertical: responsive.margin(20),
    }),
    header: {
        paddingRight: responsive.padding(60),
        gap: 30
    },
    title: {
        fontSize: responsive.fontSize(36),
        fontWeight: "700",
        color: "rgba(0,0,0,0.79)",
    },
    subtitle: {
        fontSize: responsive.fontSize(13),
        fontWeight: '400',
        color: "#888",
        marginBottom: 20,
    },
    inputText: {
        fontSize: responsive.fontSize(13),
        fontWeight: '400',
        color: "#888",
        marginLeft: responsive.padding(4)
    },
    inputContainer: (focused: boolean) => ({
        flexDirection: "row",
        alignItems: "center",
        borderColor: focused ? theme.colors.primary : theme.colors.lightgrey,
        backgroundColor: focused ? theme.colors.lightprimary(0.05) : theme.colors.background,
        borderWidth: 1,
        borderRadius: responsive.borderRadius(10),
        paddingHorizontal: responsive.padding(10),
        width: "100%",
        gap: 7
    }),
    errorText: {
        fontSize: responsive.fontSize(10),
        paddingLeft: responsive.padding(5),
        fontWeight: '400',
        color: theme.colors.error
    },
    inputCn: {
        gap: 6
    },
    input: {
        flex: 1,
        paddingVertical: responsive.padding(12),
        fontSize: responsive.fontSize(16)
    },
    forgotPassword: {
        alignSelf: "flex-end",
        color: theme.colors.primary,
        marginBottom: responsive.margin(20)
    },
    loginButton: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: responsive.padding(13),
        borderRadius: responsive.borderRadius(10),
        alignItems: "center",
        width: "100%",
    },
    loginText: {
        color: "#fff",
        fontSize: responsive.fontSize(16),
        fontWeight: "bold",
    },
    signupText: {
        marginTop: responsive.margin(20),
        color: `rgba(0,0,0,0.5)`,
    },
    signupLink: {
        color: theme.colors.primary,
        fontWeight: "bold",
    },
    orText: {
        marginVertical: responsive.margin(20),
        color: "#777",
    },
    socialContainer: {
        flexDirection: "row",
        gap: 10,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: responsive.padding(10),
        borderRadius: responsive.borderRadius(10),
        paddingHorizontal: responsive.padding(20),
    },
    socialText: {
        marginLeft: responsive.margin(8),
        fontSize: responsive.fontSize(16),
        color: "#000",
    },
    bottom: {
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    logoText: {
        color: "#000",
        fontSize: responsive.fontSize(16),
        fontWeight: '700'
    },
    loader: {
        borderRadius: 10,
        borderColor: theme.colors.lightsecondary(0.4),
        width: '100%',
        height: responsive.height(50),
        paddingRight: responsive.padding(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: responsive.padding(10)
    }
}));
