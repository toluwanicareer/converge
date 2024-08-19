import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, Animated, TouchableOpacity, Image, Linking, Platform, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, BaseUrl } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';

interface Attendee {
    id: string;
    name: string;
    company: string;
    position: string;
    email: string;
    phone: string;
    image: string;
}

interface IAnnouncement {
    title: string;
    description: string;
    location: string;
    recipient: string;
}

const colors = ['#87CEEB', '#800080', '#FFD700', '#FFA500']; 

// const getBackgroundColor = (name: string) => {
//     const colors = ['#87CEEB', '#800080', '#FFD700', '#FFA500']; // sky blue, purple, gold, orange
//     const charCodeSum = name?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
//     return colors[charCodeSum % colors.length];
// };

// const getInitials = (name: string) => {
//     const initials = name
//       .split(' ')
//       .map((part) => part[0])
//       .join('');
//     return initials.slice(0, 2).toUpperCase();
//   };



const AttendeeItem: React.FC<{ attendee: any, index: any }> = ({ attendee, index }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const toast = useToast();
    const openUrl = (url: string) => {
        Linking.openURL(url);
    };

    const getInitials = (name: string) => {
        const names = name.split(' ');
        const initials = names[0][0] + (names[1] ? names[1][0] : '');
        return initials.toUpperCase();
   
    };

    // const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // const backgroundColor = getBackgroundColor(attendee.user_id.name);
    const backgroundColor = colors[index % colors.length];
    const initials = getInitials(attendee.user_id.name);

    const handleSendEmail = async () => {
        if (!message.trim()) {
            Alert.alert("Please enter a message.");
            return;
        }

        const data = await AsyncStorage.getItem('session');

        if (data) {
            const { email } = JSON.parse(data);

            const payload: IAnnouncement = {
                recipient: attendee.user_id.email,
                title: 'Announcement',
                description: message,
                location: ''
            }
         
            const response = await axios.post(`${BaseUrl}/announcement/create`, {
                ...payload
            });

            if (response.status === 200) {
                toast.show('Annoucement created successully', {
                    type: 'success'
                })
                setModalVisible(false);
                // showAlert('Message sent successfully!');
            } else {
                toast.show('Something went wrong. Please try again', {
                    type: 'danger'
                })
            }

        }
        // // Send the email
        // const url = `mailto:${attendee.user_id.email}?subject=Message from ${attendee.user_id.name}&body=${message}`;
        // openUrl(url);

        // // Save the message using AsyncStorage
        // try {
        //     await AsyncStorage.setItem('lastMessage', message);
        // } catch (error) {
        //     console.error('Error saving message:', error);
        // }

        // Reset message and close modal
        setMessage('');

    };

    return (
        <View style={styles.attendeeItem}>
            {/* <Image source={{ uri: attendee.user_id.pix }} style={styles.attendeeImage} /> */}
            <View style={[styles.initialsContainer, { backgroundColor }]}>
                <ThemedText style={styles.initialsText}> {initials}</ThemedText>
            </View>
            <View style={styles.attendeeInfo}>
                <ThemedText style={styles.attendeeName}>{attendee.user_id.name}</ThemedText>
                <ThemedText style={styles.attendeeCompany}>{attendee.company}, {attendee.position}</ThemedText>
                <ThemedText style={styles.attendeeEmail}>{attendee.user_id.email}</ThemedText>
                <ThemedText style={styles.attendeePhone}>{attendee.user_id.phoneNum}</ThemedText>
                <View style={styles.contactButtons}>
                    {/* <TouchableOpacity onPress={() => openUrl(
                        Platform.OS === 'ios' ? `tel:${attendee.user_id.phoneNum}` : `telprompt:${attendee.user_id.phoneNum}`)}>
                        <Ionicons name="call-outline" size={20} color="#000" />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="mail-outline" size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openUrl(`https://api.whatsapp.com/send?phone=${attendee.user_id.phoneNum}`)}>
                        <Ionicons name="logo-whatsapp" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Popup Modal for sending a message */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message here"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendEmail()}>
                            <ThemedText style={styles.buttonText}>Send</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.sendButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                            <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
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
                console.log('Attendees', data.data)
                setAttendees(data.data);
            } catch (error) {
                console.error('Error loading attendees:', error);
            }
        };
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
                renderItem={({ item, index }) => <AttendeeItem attendee={item} index={index} />}
                keyExtractor={item => item._id}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    initialsContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    initialsText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
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
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    sendButton: {
        backgroundColor: '#003883',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
        marginRight: 0,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
