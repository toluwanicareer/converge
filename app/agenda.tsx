import React from 'react';
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
}

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.9; // 80% of screen width
const ITEM_HEIGHT = ITEM_WIDTH * 2; // Adjust this ratio as needed

const AgendaCard: React.FC<{ item: AgendaItem }> = ({ item }) => {
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
        },
        {
            id: '2',
            day: 'DAY 2',
            title: 'Innovation Summit',
            date: '13/10/2024',
            location: 'Tech Hub',
            time: '10:00AM',
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
                    snapDirection: 'left',
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
        //backgroundColor: 'blue',
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
        //elevation: 3,
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

    safeArea: {
        flex: 1,
    },
    // container: {
    //     flex: 1,
    // },
    // header: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 20,
    //     paddingVertical: 10,
    // },
    // headerTitle: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginLeft: 20,
    // },
    // carousel: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }
    // ... (other styles remain unchanged)

});