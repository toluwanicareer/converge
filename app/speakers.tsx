import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const SpeakersScreen = () => {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Documents</ThemedText>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                />
            </View>

            <View style={styles.speakerCard}>
                <Image
                    style={styles.speakerImage}
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&s" }}
                />
                <Text style={styles.speakerName}>SPEAKER NAME</Text>
                <Text style={styles.speakerRole}>Speaker's role and organization</Text>
            </View>

            {/* Add more speaker cards as needed */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    searchContainer: {
        //padding: 16,
        width: '80%',
        alignSelf: 'center',
    },
    searchInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 8,
    },
    speakerCard: {
        alignItems: 'center',
        margin: 16,
        borderRadius: 16,
        backgroundColor: 'white',
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        //elevation: 5,
    },
    speakerImage: {
        width: '100%',
        height: undefined,
        borderRadius: 16,
        aspectRatio: 1,
    },
    speakerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    speakerRole: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 8,
    },
});

export default SpeakersScreen;