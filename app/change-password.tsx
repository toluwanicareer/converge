import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, View, Image, Pressable } from 'react-native';
import { router, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import firedb from "@react-native-firebase/database";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import axios from 'axios';
// import { supabase } from '../lib/supabase';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePasswordScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [team, setTeam] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const navigation = useNavigation();
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
    

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



    const changePassword = async () => {
        // router.push('/home')
        try {
            
            if (password === confirmPassword ) {

                const data =  await AsyncStorage.getItem('session') ;
                if ( data ) {
                    const { email } = JSON.parse(data);
                    console.log('Confirm Password', email);
                    
                    const response = await axios.post('http://192.168.43.152:3000/user/change-pass', {
                        email, 
                        password
                    });

                    // const { data, status } = response;
                    console.log('Res', response.status);
                    if ( response.status === 200 ) {
                        router.push('/home')
                    }
                   


                }

                // const response = await axios.post('http://192.168.43.152:3000/user/login', {
                //     email, 
                //     password
                // });
            } 
        } catch (error: any) {
            console.log('RERS', error)
            Alert.alert('Error', error.message);
        }
        // if (emailValid && passwordValid) {
        //     console.log('Sign In Methods');
        // }
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
            <ThemedText style={styles.subtitle}>Change your password</ThemedText>
     
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <AntDesign 
                        name={isPasswordVisible ? "eye" : "eyeo"} 
                        size={24} 
                        color={Colors[colorScheme ?? 'light'].text} 
                        style={styles.inputIcon} 
                    />
                </TouchableOpacity>
                {/* <AntDesign name="eyeo" size={24} color="black" style={styles.inputIcon} /> */}
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
                    secureTextEntry={!isPasswordVisible}
                    editable={!isLoading}
                />
            </View>
            {!passwordValid && <ThemedText style={styles.errorText}>Please enter a password</ThemedText>}
            <View style={styles.inputContainer}>
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <AntDesign 
                    name={isConfirmPasswordVisible ? "eye" : "eyeo"} 
                    size={24} 
                    color={Colors[colorScheme ?? 'light'].text} 
                    style={styles.inputIcon} 
                />
            </TouchableOpacity>
                {/* <AntDesign name="eyeo" size={24} color="black" style={styles.inputIcon} /> */}
                <TextInput
                    style={[styles.input, !passwordValid && styles.inputError]}
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        if ( text ) {
                            setPasswordValid(true);
                            return
                        }
                        setPasswordValid(false);
                    
                    }}
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={!isConfirmPasswordVisible}
                    editable={!isLoading}
                />
            </View>
            {!passwordValid && <ThemedText style={styles.errorText}>Please enter a password</ThemedText>}
       
       
            {/* {!passwordValid && <ThemedText style={styles.errorText}>Password incorrect</ThemedText>} */}
            
            <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={changePassword}
                disabled={isLoading}
            >
                <ThemedText style={styles.loginButtonText}>
                    {isLoading ? 'Processing...' : 'Change Password'}
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
    personIcon: {
        marginRight: 20,
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
        resizeMode: 'contain'
    },
    navigationText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});