import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, BaseUrl } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Attendee {
    id: string;
    name: string;
    company: string;
    position: string;
    email: string;
    phone: string;
    image: string;
}

const AttendeeItem: React.FC<{ attendee: any }> = ({ attendee }) => {

    const openUrl = (url) => {
        Linking.openURL(url);
    }
    return (
        <View style={styles.attendeeItem}>
            <Image source={{ uri: attendee.user_id.pix }} style={styles.attendeeImage} />
            <View style={styles.attendeeInfo}>
                <ThemedText style={styles.attendeeName}>{attendee.user_id.name}</ThemedText>
                <ThemedText style={styles.attendeeCompany}>{attendee.company}, {attendee.position}</ThemedText>
                <ThemedText style={styles.attendeeEmail}>{attendee.user_id.email}</ThemedText>
                <ThemedText style={styles.attendeePhone}>{attendee.user_id.phoneNum}</ThemedText>
                <View style={styles.contactButtons}>
                    <TouchableOpacity onPress={() => openUrl(
                        Platform.OS === 'ios' ? `tel:${attendee.user_id.phoneNum}` : `telprompt:${attendee.user_id.phoneNum}`

                    )}>
                        <Ionicons name="call-outline" size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openUrl(
                        Platform.OS === 'ios' ? `message:${attendee.user_id.email}` : `mailto:${attendee.user_id.email}`)}>
                        <Ionicons name="mail-outline" size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openUrl(`https://api.whatsapp.com/send?phone=${attendee.user_id.phoneNum}`)}>
                        <Ionicons name="logo-whatsapp" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default function AttendeesScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const colorScheme = useColorScheme();

    const [attendees, setAttendees] = useState<any[]>([]);

    useEffect(() => {
        const loadAttendees = async () => {
            try {
                const response = await fetch(`${BaseUrl}/attendee`);
                const data = await response.json();
                setAttendees(data.data);

            } catch (error) {
                console.error('Error loading attendees:', error);
            }
        }
        loadAttendees();
    }, []);



    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={17} color={Colors[colorScheme ?? 'light'].text} />
                </TouchableOpacity>
                <ThemedText onPress={() => router.back()} style={styles.headerBack}>Back</ThemedText>
                <ThemedText style={styles.headerTitle}>Attendees</ThemedText>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors[colorScheme ?? 'light'].text} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for attendees"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                />
            </View>

            <FlatList
                data={searchQuery ? attendees.filter(attendee => attendee.user_id.name.toLowerCase().includes(searchQuery.toLowerCase())) : attendees}
                renderItem={({ item }) => <AttendeeItem attendee={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.attendeeList}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    headerBack: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 90
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    attendeeList: {
        paddingHorizontal: 20,
    },
    attendeeItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        //elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    attendeeImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    attendeeInfo: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 10,
    },
    attendeeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    attendeeCompany: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    attendeeEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    attendeePhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    contactButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
    },
});