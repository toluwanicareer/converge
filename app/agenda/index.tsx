import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';

interface AgendaItem {
    id: string;
    day: string;
    title: string;
    date: string;
    location: string;
    time: string;
    additionalDetails?: {
        id: string;
        time: string;
        title: string;
        host: string;
        position: string;
    }[];
}

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 2;

const AgendaScreen = () => {
    const colorScheme = useColorScheme();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<AgendaItem | null>(null);

    const agendaItems: AgendaItem[] = [
        {
            id: '1',
            day: 'DAY 1',
            title: 'Leadership & Management Conference',
            date: '12/10/2024',
            location: 'Access Towers',
            time: '9:00AM',
            additionalDetails: [
                {
                    id: '1',
                    time: '09:00 - 09:05 AM',
                    title: 'Opening Prayer',
                    host: 'Lorato Morgano',
                    position: 'Chairman, Access Bank Botswana',
                },
                // Add more additional details as needed
            ],
        },
        {
            id: '2',
            day: 'DAY 2',
            title: 'Innovation Summit',
            date: '13/10/2024',
            location: 'Tech Hub',
            time: '10:00AM',
            additionalDetails: [
                {
                    id: '2',
                    time: '10:00 - 10:05 AM',
                    title: 'Welcome Remarks',
                    host: 'John Doe',
                    position: 'CEO, Tech Innovators',
                },
                // Add more additional details as needed
            ],
        },
        // Add more agenda items as needed
    ];

    const handleShowDetails = (item: AgendaItem) => {
        setSelectedItem(item);
        router.push(`/agenda/${item.id}`);
    };

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
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <ScrollView style={styles.cardContent}>
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

                            <TouchableOpacity
                                style={styles.readMoreButton}
                                onPress={() => handleShowDetails(item)}
                            >
                                <ThemedText style={styles.readMoreText}>Read More Details</ThemedText>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )}
                mode="parallax"
                customConfig={() => ({ type: 'positive', viewCount: 2 })}
            />

            {/* Modal for additional details */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView contentContainerStyle={styles.modalScrollView}>
                            {selectedItem && (
                                <>
                                    <ThemedText style={styles.modalDayText}>{selectedItem.day}</ThemedText>
                                    <ThemedText style={styles.modalTitleText}>{selectedItem.title}</ThemedText>
                                    <View style={styles.modalDetailsContainer}>
                                        <View style={styles.modalDetailItem}>
                                            <Ionicons name="calendar-outline" size={20} color="rgba(255, 130, 0, 1)" />
                                            <View>
                                                <ThemedText style={styles.modalDetailText}>{selectedItem.date}</ThemedText>
                                                <ThemedText style={styles.modalDetailLabel}>Date</ThemedText>
                                            </View>
                                        </View>
                                        <View style={styles.modalDetailItem}>
                                            <Ionicons name="location-outline" size={20} color="rgba(255, 130, 0, 1)" />
                                            <View>
                                                <ThemedText style={styles.modalDetailText}>{selectedItem.location}</ThemedText>
                                                <ThemedText style={styles.modalDetailLabel}>Location</ThemedText>
                                            </View>
                                        </View>
                                        <View style={styles.modalDetailItem}>
                                            <Ionicons name="time-outline" size={20} color="rgba(255, 130, 0, 1)" />
                                            <View>
                                                <ThemedText style={styles.modalDetailText}>{selectedItem.time}</ThemedText>
                                                <ThemedText style={styles.modalDetailLabel}>Time</ThemedText>
                                            </View>
                                        </View>
                                    </View>

                                    {selectedItem.additionalDetails && (
                                        <View style={styles.modalExtraDetails}>
                                            {selectedItem.additionalDetails.map((detail) => (
                                                <View key={detail.id} style={styles.modalExtraDetailItem}>
                                                    <ThemedText style={styles.modalExtraDetailTime}>{detail.time}</ThemedText>
                                                    <ThemedText style={styles.modalExtraDetailTitle}>{detail.title}</ThemedText>
                                                    <ThemedText style={styles.modalExtraDetailHost}>{detail.host}</ThemedText>
                                                    <ThemedText style={styles.modalExtraDetailPosition}>{detail.position}</ThemedText>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </>
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
};

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
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 50,
        color: '#FF8200',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsContainer: {
        marginTop: 20,
        width: ITEM_WIDTH - 20,
    },
    detailItem: {
        flexDirection: 'row',
        gap: 7,
        marginBottom: 20, // Increased margin for better spacing
    },
    detailIcon: {
        marginRight: 10, // Space between icon and text
    },
    detailText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    detailLabel: {
        fontSize: 14,
        color: 'gray',
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalDayText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalTitleText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDetailsContainer: {
        marginTop: 10,
        width: '100%',
    },
    modalDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalDetailText: {
        fontSize: 18,
        marginLeft: 10,
    },
    modalDetailLabel: {
        fontSize: 14,
        color: 'gray',
    },
    modalExtraDetails: {
        marginTop: 20,
        width: '100%',
    },
    modalExtraDetailItem: {
        marginBottom: 15,
    },
    modalExtraDetailTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalExtraDetailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalExtraDetailHost: {
        fontSize: 14,
    },
    modalExtraDetailPosition: {
        fontSize: 14,
        color: 'gray',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
        padding: 10,
    },
});

export default AgendaScreen;
