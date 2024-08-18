import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BaseUrl } from '@/constants/Colors';
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

const PollItem: React.FC<{ poll: any, options: any, vote: any }> = ({ poll, options, vote }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [voterTracker, setVoterTracker] = useState<any>([]);
    const [pollAnswers, setPollAnswers] = useState<any>([]);

    const hasUserVotted = (pollId: number) => {

        if (voterTracker.includes(pollId)) {
            return true;
        }
        return false;
    }




    const handleOptionSelect = async (pollId: string, optionId: string) => {
        console.log('Voting for option', optionId);
        if (hasUserVotted(poll._id)) {
            console.log('User has already voted');
            return;
        }
        try {
            await vote(optionId);
            const oldPollAnswers = pollAnswers;
            const oldVoterTracker = voterTracker;
            setVoterTracker([...voterTracker, pollId]);
            setPollAnswers([...pollAnswers, { [pollId]: optionId }]);
            console.log([...pollAnswers, { [pollId]: optionId }]);
            try {
                await AsyncStorage.setItem('voterTracker', JSON.stringify([...oldVoterTracker, pollId]));
                await AsyncStorage.setItem('pollAnswers', JSON.stringify([...oldPollAnswers, { [pollId]: optionId }]));
            }
            catch {
                console.log('Error votings');
            }
        } catch {
            console.log('Error votings');
        }
    }

    // useEffect(() => {
    //     //clearAsyncStorage();
    //     AsyncStorage.setItem('voterTracker', JSON.stringify([]));
    //     AsyncStorage.setItem('pollAnswers', JSON.stringify([]));
    // }, [])

    const getProgressPercentage = (optionId: string) => {
        return selectedOption === optionId ? 100 : 0; // Progress based on selected option
    };

    const loadData = async () => {
        const pollsA = await AsyncStorage.getItem('pollAnswers')
        if (pollsA) {
            setPollAnswers(JSON.parse(pollsA));
        }
        const votes = await AsyncStorage.getItem('voterTracker')
        if (votes) {
            console.log(JSON.parse(votes), "pppp");
            setVoterTracker(JSON.parse(votes));
        }
    }

    useEffect(() => {
        loadData();
    }
        , [])

    const getSum = () => {
        let sum = 0;
        options.map((option: any) => {
            sum += option.count;
        })

        return sum;
    }

    const checkUserVote = (pollId: string) => {
        const userVote = pollAnswers.find((vote: any) => vote[pollId]);
        return userVote ? userVote[pollId] : null;
    }

    return (
        <View style={styles.pollItem}>
            <ThemedText style={styles.pollTitle}>{poll.question}</ThemedText>
            <ThemedText style={styles.pollInstruction}>Select one option</ThemedText>
            {options?.map((option: any) => {

                return (
                    <TouchableOpacity
                        key={option._id}
                        style={styles.optionItem}
                        onPress={() => handleOptionSelect(poll._id, option._id)}
                    >
                        <View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <View style={[styles.radioButton, hasUserVotted(poll._id) ? checkUserVote(poll._id) == option._id ? styles.selectedRadioButton : null : null]} />
                                <ThemedText style={styles.optionText}>{option.option}</ThemedText>
                            </View>

                            <View style={styles.optionContainer}>

                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                    <View style={styles.progressBarBackground}>
                                        <View style={[styles.progressBar, { width: `${(option.count == 0 || !hasUserVotted(poll._id)) ? 0 : (option.count / getSum()) * 100}%` }]} />
                                    </View>
                                    {hasUserVotted(poll._id) && <ThemedText style={styles.optionText}>{option.count}</ThemedText>}

                                </View>

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
    const [polls, setPolls] = useState<any>(null);
    const [options, setOptions] = useState<any>(null);

    useEffect(() => {
        getPoll()
    }, [])

    const getPoll = async () => {
        const response = await fetch(`${BaseUrl}/poll/with-options`);
        const data = await response.json();

        setPolls(data.polls);
        setOptions(data.options);
    }

    const vote = async (optionId: string) => {
        try {
            const response = await fetch(`${BaseUrl}/poll/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ optionId }),
            });
            const data = await response.json();
            console.log(data);
            await getPoll();
        } catch {
            console.log('Error voting');
        }
    }

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Polls</ThemedText>
            </View>

            <FlatList
                data={polls}
                renderItem={({ item }) => <PollItem vote={vote} poll={item} options={options?.filter((option: any) => option.pollId === item._id)} />}
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
        marginTop: 50,
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
        marginBottom: 20,
    },
    radioButton: {
        width: 15,
        height: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF8200',
        marginRight: 10,
    },
    optionContainer: {
        flex: 1,
    },
    selectedRadioButton: {
        backgroundColor: '#FF8200', // Color for selected option
        //borderColor: '#FF8200', // Border color for selected option
    },
    optionText: {
        fontSize: 16,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        marginTop: 10,
        width: '95%',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FF8200',
        borderRadius: 3,
    },
});