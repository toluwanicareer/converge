import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
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

const AttendeeItem: React.FC<{ attendee: Attendee }> = ({ attendee }) => (
    <View style={styles.attendeeItem}>
        <Image source={{ uri: attendee.image }} style={styles.attendeeImage} />
        <View style={styles.attendeeInfo}>
            <ThemedText style={styles.attendeeName}>{attendee.name}</ThemedText>
            <ThemedText style={styles.attendeeCompany}>{attendee.company}, {attendee.position}</ThemedText>
            <ThemedText style={styles.attendeeEmail}>{attendee.email}</ThemedText>
            <ThemedText style={styles.attendeePhone}>{attendee.phone}</ThemedText>
            <View style={styles.contactButtons}>
                <TouchableOpacity onPress={() => console.log('Email pressed')}>
                    <Ionicons name="mail-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Phone pressed')}>
                    <Ionicons name="call-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('WhatsApp pressed')}>
                    <Ionicons name="logo-whatsapp" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

export default function AttendeesScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const colorScheme = useColorScheme();

    const attendees: Attendee[] = [
        {
            id: '1',
            name: 'Name of Attendee',
            company: 'Access Bank Nigeria',
            position: 'Retail Ops',
            email: 'emailaddress@accessbankplc.com',
            phone: '+234 8130664566',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&s'
        },
        // Add more attendees here...
    ];

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
                data={attendees}
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