import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface AgendaItem {
    id: string;
    day: string;
    title: string;
    date: string;
    location: string;
    time: string;
    additionalDetails?: string[];
}

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 2;

const AgendaCard: React.FC<{ item: AgendaItem }> = ({ item }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <ScrollView style={styles.card} contentContainerStyle={styles.cardContent}>
            <ThemedText style={styles.dayText}>{item.day}</ThemedText>
            <ThemedText style={styles.titleText}>{item.title}</ThemedText>
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={20} color="rgba(255, 130, 0, 1)" />
                    <View>
                        <ThemedText style={styles.detailText}>{item.date}</ThemedText>
                        <ThemedText style={styles.detailLabel}>Date</ThemedText>
                    </View>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="location-outline" size={20} color="rgba(255, 130, 0, 1)" />
                    <View>
                        <ThemedText style={styles.detailText}>{item.location}</ThemedText>
                        <ThemedText style={styles.detailLabel}>Location</ThemedText>
                    </View>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={20} color="rgba(255, 130, 0, 1)" />
                    <View>
                        <ThemedText style={styles.detailText}>{item.time}</ThemedText>
                        <ThemedText style={styles.detailLabel}>Time</ThemedText>
                    </View>
                </View>
            </View>

            {showDetails && (
                <View style={styles.extraDetails}>
                    {/* Display additional details here */}
                    {item.additionalDetails?.map((detail, index) => (
                        <ThemedText key={index} style={styles.detailText}>
                            {detail}
                        </ThemedText>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => setShowDetails(!showDetails)}
            >
                <ThemedText style={styles.readMoreText}>
                    {showDetails ? 'Show Less' : 'Read More'}
                </ThemedText>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default function AgendaScreen() {
    const colorScheme = useColorScheme();

    const agendaItems: AgendaItem[] = [
        {
            id: '1',
            day: 'DAY 1',
            title: 'Leadership & Management Conference',
            date: '12/10/2024',
            location: 'Access Towers',
            time: '9:00AM',
            additionalDetails: ['Introduction to leadership', 'Keynote by CEO'],
        },
        {
            id: '2',
            day: 'DAY 2',
            title: 'Innovation Summit',
            date: '13/10/2024',
            location: 'Tech Hub',
            time: '10:00AM',
            additionalDetails: ['Panel discussion on tech trends', 'Networking session'],
        },
        // Add more agenda items as needed
    ];

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Agenda</ThemedText>
            </View>

            <Carousel
                loop={false}
                width={screenWidth}
                height={ITEM_HEIGHT}
                style={styles.carousel}
                defaultIndex={0}
                data={agendaItems}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('Current index:', index)}
                renderItem={({ item }) => <AgendaCard item={item} />}
                modeConfig={{
                    stackInterval: 20,
                }}
                mode="parallax"
                customConfig={() => ({ type: 'positive', viewCount: 2 })}
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
        marginBottom: 0,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    carousel: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    card: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 2,
        borderColor: '#000',
    },
    cardContent: {
        padding: 20,
    },
    dayText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 40,
        color: 'rgba(255, 130, 0, 1)',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailsContainer: {
        marginTop: 20,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    detailLabel: {
        fontSize: 16,
        color: '#666',
        marginLeft: 10,
    },
    detailText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    extraDetails: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },
    readMoreButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FF8200',
        borderRadius: 10,
        alignItems: 'center',
    },
    readMoreText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
