import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface PollOption {
    id: string;
    text: string;
    progress: number;
}

interface Poll {
    id: string;
    title: string;
    instruction: string;
    options: PollOption[];
}

const PollItem: React.FC<{ poll: Poll }> = ({ poll }) => (
    <View style={styles.pollItem}>
        <ThemedText style={styles.pollTitle}>{poll.title}</ThemedText>
        <ThemedText style={styles.pollInstruction}>{poll.instruction}</ThemedText>
        {poll.options.map((option) => (
            <TouchableOpacity key={option.id} style={styles.optionItem}>
                <View style={styles.radioButton} />
                <View style={styles.optionContainer}>
                    <ThemedText style={styles.optionText}>{option.text}</ThemedText>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBar, { width: `${option.progress}%` }]} />
                    </View>
                </View>
            </TouchableOpacity>
        ))}
    </View>
);

export default function PollsScreen() {
    const colorScheme = useColorScheme();

    const polls: Poll[] = [
        {
            id: '1',
            title: 'Title of Poll',
            instruction: 'Select one or more',
            options: [
                { id: '1', text: 'Option 1 goes here', progress: 40 },
                { id: '2', text: 'Option 2 goes here', progress: 60 },
                { id: '3', text: 'Option 3 goes here', progress: 80 },
            ],
        },
        {
            id: '2',
            title: 'Title of Poll',
            instruction: 'Select one or more',
            options: [
                { id: '1', text: 'Option 1 goes here', progress: 50 },
                { id: '2', text: 'Option 2 goes here', progress: 50 },
            ],
        },
        {
            id: '3',
            title: 'Title of Poll',
            instruction: 'Select one or more',
            options: [
                { id: '1', text: 'Option 1 goes here', progress: 70 },
                { id: '2', text: 'Option 2 goes here', progress: 30 },
            ],
        },
    ];

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Polls</ThemedText>
            </View>

            <FlatList
                data={polls}
                renderItem={({ item }) => <PollItem poll={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.pollList}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    pollList: {
        paddingHorizontal: 20,
    },
    pollItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    pollTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pollInstruction: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 10,
    },
    optionContainer: {
        flex: 1,
    },
    optionText: {
        fontSize: 16,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        marginTop: 5,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FF8200',
        borderRadius: 3,
    },
});