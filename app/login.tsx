import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, View, Image, Pressable } from 'react-native';
import { router, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
// import firedb from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
// import { supabase } from '../lib/supabase';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/context/auth/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    
    const handleSendOTP = async () => {
        if (!email) {
            setEmailValid(false);
            return;
        }
        
        setIsLoading(true);
        
        try {
            // Check if user exists
            // const { data: { user }, error: userError } = await supabase.auth.getUser(email);
            // console.log('User:', user, 'Error:', userError);
            // if (userError && userError.status !== 404) {
            //     console.error('Error fetching user:', userError);
            //     throw userError;
            // }

            // if (!user) {
            //     // User doesn't exist, sign up
            //     const { error: signUpError } = await supabase.auth.signUp({
            //         email: email,
            //         password: Math.random().toString(36).slice(-8), // Generate a random password
            //     });

            //     if (signUpError) throw signUpError;

            //     console.log('New user registered');
            // }

            // Send OTP for login (works for both new and existing users)
            // const { error: otpError } = await supabase.auth.signInWithOtp({ email });
            // if (otpError) throw otpError;

            // Navigate to OTP screen
            router.push('/otp');
        } catch (error) {

        } finally {
            setIsLoading(false);
        };
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (emailValid && passwordValid) {
            
            try {
                setIsLoading(true);
                // Replace with your server's login endpoint
                const response = await axios.post('http://192.168.43.152:3000/user/login', {
                    email, 
                    password
                });

                const {data, status} = response;
                setIsLoading(false);
                console.log(data)
                AsyncStorage.setItem('session',JSON.stringify(data.data))
                if( !data.data.passwordChanged) {
                    router.push('/change-password');
                    return
                }

                router.push('/home');
            } catch (error: any) {
                setIsLoading(false);
                Alert.alert('Error', error.message);
            }
        }
        //Check if user exists.
        // const auth = getAuth();
        // const signInMethods = await fetchSignInMethodsForEmail(auth, email); 
    }

    return (
        <ThemedView style={styles.container}>
            <View style={styles.imageContainer} >
                <Image source={require('../assets/images/logo_converge.png')} style={styles.logoImage}/>
            </View>
            <ThemedText style={styles.title}>Welcome to Access Converge-X</ThemedText>
            <ThemedText style={styles.subtitle}>Please enter email and password to login</ThemedText>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color={Colors[colorScheme ?? 'light'].text} style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !emailValid && styles.inputError]}
                    placeholder="Enter email address"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        if(validateEmail(text)) {
                            setEmailValid(true);
                            return
                        }
                        setEmailValid(false);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
            </View>
            {!emailValid && <ThemedText style={styles.errorText}>Please enter a valid email</ThemedText>}
            <View style={styles.inputContainer}>
            <TouchableOpacity onPress={togglePasswordVisibility}>
                    <AntDesign 
                        name={isPasswordVisible ? "eye" : "eyeo"} 
                        size={24} 
                        color={Colors[colorScheme ?? 'light'].text} 
                        style={styles.inputIcon} 
                    />
            </TouchableOpacity>
                {/* <AntDesign name={isPasswordVisible ? "eye" : "eyeo"}  size={24} color="black" style={styles.inputIcon} /> */}
                <TextInput
                    style={[styles.input, !passwordValid && styles.inputError]}
                    placeholder="Enter Password"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if ( text ) {
                            setPasswordValid(true);
                            return
                        }
                        setPasswordValid(false);
                    
                    }}
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                    editable={!isLoading}
                />
            </View>
            {!passwordValid && <ThemedText style={styles.errorText}>Please enter a password</ThemedText>}

            <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <ThemedText style={styles.loginButtonText}>
                    {isLoading ? 'Authenticating...' : 'Login'}
                </ThemedText>
            </TouchableOpacity>

            {/* <View style={styles.navigationText}>
                <Pressable >
                   <Link href='/change-password'>
                    Change Password
                   </Link> 
                </Pressable>
            </View> */}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    inputError: {
        borderBottomColor: 'red',
    },
    inputIcon: {
        marginRight: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: '#FF8200',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#9B59B6',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // backgroundColor: '#f0f0f0'
    },
    logoImage: {
        justifyContent: 'center',
        resizeMode: 'contain',
        width: 300,
        height: 45,
        // backgroundColor: 'red'
    },
    navigationText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});