import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, BaseUrl } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Announcement = {
    id: string;
    title: string;
    date: string;
    content: string;
};

type AnnouncementItemProps = {
    announcement: any;
    onPress: () => void;
};

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ announcement, onPress }) => (
    <TouchableOpacity style={styles.announcementItem} onPress={onPress}>
        <View style={styles.announcementIcon}>
            <Ionicons name="notifications-outline" size={24} color="#FF9500" />
        </View>
        <View style={styles.announcementContent}>
            <ThemedText style={styles.announcementTitle}>{announcement.title}</ThemedText>
            <ThemedText style={styles.announcementDate}>{new Date(announcement.createdAt).toLocaleDateString()} {new Date(announcement.createdAt).toLocaleTimeString()}</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
    </TouchableOpacity>
);

type AnnouncementDetailProps = {
    announcement: any;
};

const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ announcement }) => (
    <ScrollView style={styles.detailContainer}>
        <ThemedText style={styles.detailTitle}>{announcement.title}</ThemedText>
        <View style={styles.detailDateContainer}>
            <Ionicons name="calendar-outline" size={16} color="#FF9500" />
            <ThemedText style={styles.detailDate}>{new Date(announcement.createdAt).toLocaleDateString()} {new Date(announcement.createdAt).toLocaleTimeString()}</ThemedText>
        </View>
        <ThemedText style={styles.detailContent}>{announcement.description}</ThemedText>
    </ScrollView>
);

export default function AnnouncementsScreen() {
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const colorScheme = useColorScheme() ?? 'light'; // Default to 'light' if colorScheme is null

    useEffect(() => {
        // Initial fetch
        fetchAnnouncements();

        // Set up interval to refresh announcements every 10 seconds
        const interval = setInterval(() => {
            fetchAnnouncements();
        }, 10000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const fetchAnnouncements = async () => {
        const session = await AsyncStorage.getItem('session');

        if( session ) {
            const { email } = JSON.parse(session);
            // Here you would typically make an API call to fetch the latest announcements
            // const response = await fetch(`${BaseUrl}/announcement`);
            const response = await fetch(`${BaseUrl}/announcement`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    email 
                }),
            });
            const data = await response.json();
            setAnnouncements(data.data);
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text} />
                <ThemedText style={styles.backText}>Back</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Announcements</ThemedText>
        </View>
    );

    if (selectedAnnouncement) {
        return (
            <ThemedView style={styles.container}>
                {renderHeader()}
                <AnnouncementDetail announcement={selectedAnnouncement} />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            {renderHeader()}
            <FlatList
                data={announcements}
                renderItem={({ item }) => (
                    <AnnouncementItem
                        announcement={item}
                        onPress={() => setSelectedAnnouncement(item)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.announcementsList}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#FFF',
        marginTop: 40,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 17,
        marginLeft: 5,
        color: Colors.light.text, // Adjust color based on theme
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: Colors.light.text, // Adjust color based on theme
    },
    announcementsList: {
        //paddingHorizontal: 16,
    },
    announcementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        //borderRadius: 8,
        padding: 16,
        marginTop: 16,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFF4',
        borderLeftWidth: 3,
        borderLeftColor: '#FF9500',
        paddingVertical: 16,
    },
    announcementIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    announcementContent: {
        flex: 1,
    },
    announcementTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.light.text, // Adjust color based on theme
    },
    announcementDate: {
        fontSize: 13,
        color: '#8E8E93',
    },
    detailContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF', // Set a clear background for detail view
        borderRadius: 8, // Add some rounding to match the item cards
        shadowColor: '#000', // Add shadow to detail view
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.light.text, // Adjust color based on theme
    },
    detailDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailDate: {
        fontSize: 15,
        color: '#8E8E93',
        marginLeft: 8,
    },
    detailContent: {
        fontSize: 17,
        lineHeight: 24,
        color: Colors.light.text, // Adjust color based on theme
    },
});
