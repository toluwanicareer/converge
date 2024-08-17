import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
// import axios from 'axios';

interface PollOption {
    id: string;
    text: string;
    progress?: number;
    votes: number; 
}

interface Poll {
    id: string;
    title: string;
    instruction: string;
    options: PollOption[];
}

const PollItem: React.FC<{ poll: Poll }> = ({ poll }) => { 
    const [selectedOption, setSelectedOption] = useState<string | null >(null);
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState(true);
    const [pollOptions, setPollOptions] = useState<PollOption[]>(poll.options);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSelectedOption = async () => {
            try {
                const storageKey = 'pollAnswers';
                const pollAnswers = await AsyncStorage.getItem(storageKey);
                const parsedAnswers = pollAnswers ? JSON.parse(pollAnswers) : {};

                // Initialize state with no selected option if none is stored
                setSelectedOption(parsedAnswers[poll.id] || null);
            } catch (error) {
                console.error('Error fetching poll data from AsyncStorage:', error);
            }
        };

        fetchSelectedOption();
    }, [poll.id]);

    const handleOptionSelect = async (pollId: string, optionId: string) => {
        try {
            // Update the selected option
            setSelectedOption(optionId);

            // Update votes for the selected option
            const updatedOptions = pollOptions.map(option =>
                option.id === optionId
                    ? { ...option, votes: option.votes + 1 }
                    : option
            );

            setPollOptions(updatedOptions);

            // Save to AsyncStorage
            const storageKey = 'pollAnswers';
            const pollAnswers = await AsyncStorage.getItem(storageKey);
            const parsedAnswers = pollAnswers ? JSON.parse(pollAnswers) : {};

            parsedAnswers[pollId] = optionId;
            await AsyncStorage.setItem(storageKey, JSON.stringify(parsedAnswers));
        } catch (error) {
            console.error('Error saving to AsyncStorage:', error);
        }
    };

    const getProgressPercentage = (optionId: string) => {
        return selectedOption === optionId ? 100 : 0; // Progress based on selected option
    };

    return (
        <View style={styles.pollItem}>
            <ThemedText style={styles.pollTitle}>{poll.title}</ThemedText>
            <ThemedText style={styles.pollInstruction}>{poll.instruction}</ThemedText>
            {pollOptions.map((option) => {
                const isSelected = selectedOption === option.id;
                const progressPercentage = option.votes / Math.max(...pollOptions.map(o => o.votes)) * 100;
                return (

                    <TouchableOpacity 
                        key={option.id} 
                        style={styles.optionItem}
                        onPress={() => handleOptionSelect(poll.id, option.id)}
                    >
                        <View style={[styles.radioButton, isSelected && styles.selectedRadioButton]} />
                        <View style={styles.optionContainer}>
                            <ThemedText style={styles.optionText}>{option.text}</ThemedText>
                            <View style={styles.progressBarBackground}>
                                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
                                {/* <ThemedText style={styles.optionText}>Votes: {option.votes}</ThemedText> */}
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}

export default function PollsScreen() {
    const colorScheme = useColorScheme();

    const polls: Poll[] = [
        {
            id: '1',
            title: 'Title of Poll',
            instruction: 'Select one',
            options: [
                { id: '1', text: 'Option 1 goes here', votes: 40 },
                { id: '2', text: 'Option 2 goes here', votes: 60 },
                { id: '3', text: 'Option 3 goes here', votes: 80 },
            ],
        },
        {
            id: '2',
            title: 'Title of Poll',
            instruction: 'Select one',
            options: [
                { id: '1', text: 'Option 1 goes here', votes: 50 },
                { id: '2', text: 'Option 2 goes here', votes: 50 },
            ],
        },
        {
            id: '3',
            title: 'Title of Poll',
            instruction: 'Select one',
            options: [
                { id: '1', text: 'Option 1 goes here', votes: 70 },
                { id: '2', text: 'Option 2 goes here', votes: 30 },
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
                data={ polls }
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
    selectedRadioButton: {
        backgroundColor: '#FF8200', // Color for selected option
        borderColor: '#FF8200', // Border color for selected option
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