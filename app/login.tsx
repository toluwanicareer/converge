import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();

    const handleSendOTP = async () => {
        if (!email) {
            setEmailValid(false);
            return;
        }

        setIsLoading(true);
        try {
            //navigate to home screen
            router.push('/home');
        } catch (error) {

        } finally {
            setIsLoading(false);
        };
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Welcome</ThemedText>
            <ThemedText style={styles.subtitle}>Enter your email to receive a login code</ThemedText>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color={Colors[colorScheme ?? 'light'].text} style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, !emailValid && styles.inputError]}
                    placeholder="Email address"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailValid(true);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
            </View>
            {!emailValid && <ThemedText style={styles.errorText}>Please enter a valid email</ThemedText>}

            <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleSendOTP}
                disabled={isLoading}
            >
                <ThemedText style={styles.loginButtonText}>
                    {isLoading ? 'Processing...' : 'Send Login Code'}
                </ThemedText>
            </TouchableOpacity>
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
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
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
});