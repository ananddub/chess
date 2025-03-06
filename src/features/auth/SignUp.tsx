import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import responsive from '../../helpers/responsive';
import { goBack } from '../../helpers/NavigationUtil';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottiHosre from './component/LottiHosre';
import { ThemeContext } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm password is required'),
});

export default function SignUp() {
    const { styles, theme } = useStyles(stylesheet);
    const [focused, setFocused] = useState<null | string>(null);
    const [emailerror, setEmailError] = useState<string>('');
    const [onLoading, setLoading] = useState<boolean>(false);
    const handleSubmit = (values: { email: string; password: string }) => {
        try {
            setLoading(true);
            console.log('Sign Up Data:', values);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const iconActiveColor = (focused: boolean) => {
        if (focused) {
            return theme.colors.primary
        } else {
            return theme.colors.lightsecondary(0.3)
        }
    }
    const scrollRef = useRef<ScrollView>(null);
    return (
        <Formik
            initialValues={{ email: '', password: '', confirmPassword: '', name: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <KeyboardAvoidingView
                    style={styles.keyboardavoid}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView ref={scrollRef} style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                {
                                    <LottiHosre size={80} />
                                    // <Image
                                    //     source={IconImage.wQ}
                                    //     style={styles.logo(30)}
                                    // />
                                    // <Text style={styles.logoText}>Chess</Text>
                                }
                            </View>
                            <Text style={styles.title}>Sign up to your Account</Text>
                            <Text style={styles.subtitle}>
                                Enter your email and password to sigup in into your account
                            </Text>
                        </View>
                        <View style={{ gap: 10 }}>
                            <View style={styles.inputCn}>
                                <Text style={styles.inputText}>Name</Text>
                                <View style={styles.inputContainer(focused === 'name')}>

                                    <Ionicons name="person-outline" size={responsive.fontSize(17)}
                                        color={iconActiveColor(focused === "name")} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your Name"
                                        autoCapitalize="none"
                                        onChangeText={handleChange('name')}
                                        onFocus={() => {
                                            scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
                                            setFocused('name');
                                        }}
                                        onBlur={() => {
                                            handleBlur('name');
                                            setFocused(null);
                                        }}
                                        value={values.email}
                                    />
                                </View>
                                {touched.name && errors.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}
                            </View>
                            <View style={styles.inputCn}>
                                <Text style={styles.inputText}>Email</Text>
                                <View style={styles.inputContainer(focused === 'email')}>
                                    <Ionicons name="mail-outline" size={responsive.fontSize(17)}
                                        color={iconActiveColor(focused === "email")} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your email"
                                        autoCapitalize="none"
                                        onChangeText={handleChange('email')}
                                        onFocus={() => {
                                            setFocused('email');
                                            scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
                                        }}
                                        onBlur={() => {
                                            handleBlur('email');
                                            setFocused(null);
                                        }}
                                        value={values.email}
                                    />
                                </View>
                                {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                                {emailerror && (
                                    <Text style={styles.errorText}>{emailerror}</Text>
                                )}
                            </View>

                            <View style={styles.inputCn}>
                                <Text style={styles.inputText}>Password</Text>
                                <View style={styles.inputContainer(focused === 'password')}>

                                    <Ionicons name="lock-closed-outline" size={responsive.fontSize(17)}
                                        color={iconActiveColor(focused === "password")} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Your password"
                                        secureTextEntry
                                        autoCapitalize="none"
                                        onChangeText={handleChange('password')}
                                        onFocus={() => {
                                            setFocused('password');
                                            scrollRef.current?.scrollToEnd({ animated: true });
                                        }}
                                        onBlur={() => {
                                            handleBlur('password');
                                            setFocused(null);
                                        }}
                                        value={values.password}
                                    />
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}
                            </View>

                            <View style={styles.inputCn}>
                                <Text style={styles.inputText}>Confirm Password</Text>
                                <View
                                    style={styles.inputContainer(focused === 'confirmPassword')}>
                                    <Ionicons name="lock-closed-outline" size={responsive.fontSize(17)}
                                        color={iconActiveColor(focused === "confirmPassword")} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm password"
                                        secureTextEntry
                                        autoCapitalize="none"
                                        onChangeText={handleChange('confirmPassword')}
                                        onFocus={() => {
                                            setFocused('confirmPassword');
                                            scrollRef.current?.scrollToEnd({ animated: true });
                                        }}
                                        onBlur={() => {
                                            handleBlur('confirmPassword');
                                            setFocused(null);
                                        }}
                                        value={values.confirmPassword}
                                    />
                                </View>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}
                            </View>
                        </View>
                        {onLoading ? (
                            <View style={styles.loader}>
                                <LottiHosre size={60} autoPlay loop />
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.signupButton}
                                onPress={handleSubmit}>
                                {<Text style={styles.signupText}>Sign Up</Text>}
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                goBack();
                            }}
                            style={styles.bottom}>
                            <Text style={styles.logintext}>
                                Aleady have an account?{' '}
                                <Text style={styles.signupLink}>Log In</Text>
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </Formik>
    );
}

const stylesheet = createStyleSheet((theme, rtl) => ({
    container: {
        flex: 1,
        paddingHorizontal: responsive.padding(20),
        backgroundColor: theme.colors.background,
        gap: 10,
    },
    header: {
        gap: 20,
        marginBottom: 20,
        paddingRight: responsive.padding(60),
    },
    title: {
        fontSize: responsive.fontSize(36),
        fontWeight: '700',
        color: '#000',
    },
    subtitle: {
        fontSize: responsive.fontSize(13),
        color: '#888',
    },
    logo: (value: number) => ({
        width: responsive.width(value),
        height: responsive.height(value),
        marginVertical: responsive.margin(20),
    }),
    inputCn: {
        gap: 6,
    },
    inputText: {
        fontSize: responsive.fontSize(13),
        paddingLeft: responsive.padding(5),
        color: '#888',
    },
    inputContainer: focused => ({
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: focused ? theme.colors.primary : theme.colors.lightgrey,
        backgroundColor: focused
            ? theme.colors.lightprimary(0.05)
            : theme.colors.background,
        borderWidth: 1,
        borderRadius: responsive.borderRadius(10),
        paddingHorizontal: responsive.padding(12),
        gap: 10,
        width: '100%',
    }),
    errorText: {
        fontSize: responsive.fontSize(10),
        color: theme.colors.error,
    },
    input: {
        flex: 1,
        paddingVertical: responsive.padding(12),
        fontSize: responsive.fontSize(15),
    },
    signupButton: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: responsive.padding(13),
        borderRadius: responsive.borderRadius(10),
        alignItems: 'center',
        marginTop: responsive.margin(20),
    },
    signupText: {
        color: '#fff',
        fontSize: responsive.fontSize(16),
        fontWeight: 'bold',
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupLink: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    logintext: {
        marginTop: responsive.margin(20),
        color: `rgba(0,0,0,0.5)`,
    },
    logoContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    logoText: {
        color: '#000',
        fontSize: responsive.fontSize(16),
        fontWeight: '700',
    },
    keyboardavoid: {
        flex: 1,
        paddingTop: rtl.insets.top,
        backgroundColor: theme.colors.background,
    },
    loader: {
        width: rtl.screen.width - responsive.width(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
