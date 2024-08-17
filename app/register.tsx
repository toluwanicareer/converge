import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, View, Image, Pressable } from 'react-native';
import { router, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import firedb from "@react-native-firebase/database";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
// import { supabase } from '../lib/supabase';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [team, setTeam] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();
    
    
    
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
            console.error('Error in login process:', error);
            // Handle error (show error message to user)

        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (emailValid && passwordValid) {
            console.log('Sign In Methods');
            try {
                

            } catch (error) {
                Alert.alert('I dey');
            }
        }
        //Check if user exists.
        // const auth = getAuth();
        // const signInMethods = await fetchSignInMethodsForEmail(auth, email); 
    }

    return (
        <ThemedView style={styles.container}>
            <View style={styles.imageContainer} >
                <Image source={require('../assets/images/converge_logo.png')} style={styles.logoImage}/>
            </View>
            <ThemedText style={styles.title}>Converge</ThemedText>
            <ThemedText style={styles.subtitle}>Fill in your details</ThemedText>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color={Colors[colorScheme ?? 'light'].text} style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !emailValid && styles.inputError]}
                    placeholder="Email address"
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
                <FontAwesome6 name="person" size={24} color={Colors[colorScheme ?? 'light'].text} style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !emailValid && styles.inputError]}
                    placeholder="Username"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    value={email}
                    onChangeText={(text) => {
                        setName(text);
                        // if(validateEmail(text)) {
                        //     setEmailValid(true);
                        //     return
                        // }
                        // setEmailValid(false);
                    }}
                    keyboardType="default"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
            </View>
            {!emailValid && <ThemedText style={styles.errorText}>Please enter a valid email</ThemedText>}
            <View style={styles.inputContainer}>
                <AntDesign name="eyeo" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !passwordValid && styles.inputError]}
                    placeholder="Password"
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
                    editable={!isLoading}
                />
            </View>
            {!passwordValid && <ThemedText style={styles.errorText}>Please enter a password</ThemedText>}
            <View style={styles.inputContainer}>
                <Feather name="phone" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !passwordValid && styles.inputError]}
                    placeholder="Phone Number"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    value={phoneNumber}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        // if ( text ) {
                        //     setPasswordValid(true);
                        //     return
                        // }
                        // setPasswordValid(false);
                    
                    }}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
            </View>
            <View style={styles.inputContainer}>
                <AntDesign name="team" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !passwordValid && styles.inputError]}
                    placeholder="Team"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    value={phoneNumber}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        // if ( text ) {
                        //     setPasswordValid(true);
                        //     return
                        // }
                        // setPasswordValid(false);
                    
                    }}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
            </View>
            {/* {!passwordValid && <ThemedText style={styles.errorText}>Password incorrect</ThemedText>} */}
            
            <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <ThemedText style={styles.loginButtonText}>
                    {isLoading ? 'Processing...' : 'Register'}
                </ThemedText>
            </TouchableOpacity>
            <View style={styles.navigationText}>
                <Pressable >
                   <Link href='/login'>
                    Proceed to Login
                   </Link> 
                </Pressable>
            </View>
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
        backgroundColor: '#4B0082',
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
        resizeMode: 'contain'
    },
    navigationText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});