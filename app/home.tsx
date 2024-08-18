import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Href } from 'expo-router';
// import { useSession } from '@/context/auth/auth';
import useSession from '@/hooks/useSession';
import { NotificationContext } from '@/context/auth/app';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

interface NavCardProps {
    title: string;
    image: any; // Use the appropriate type for your image source
    onPress: () => void;
}

const NavCard: React.FC<NavCardProps> = ({ title, image, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <ImageBackground source={image} style={styles.cardBackground} imageStyle={styles.cardImage}>
            <View style={styles.cardOverlay}>
                <View style={styles.cardTextContainer}>
                    <ThemedText style={styles.cardTitle}>{title}</ThemedText>
                    <ThemedText style={styles.cardSubtitle}>Click to view →</ThemedText>
                </View>
            </View>
        </ImageBackground>
    </TouchableOpacity>
);

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const userName = "Tolulope Esther"; // This should be fetched from user state or context
    const { session, loading: sessionIsFetching } = useSession();
    const [userData, setUserData] = useState<any>(null);
    const ctx = useContext(NotificationContext);


    useEffect(() => {

        if (session && !sessionIsFetching) {
            console.log('Session', session);
            setUserData(session);

        }

    }, [session])

    const navItems = [
        { title: "Attendees", image: require('@/assets/images/1.png') },
        { title: "Directors", image: require('@/assets/images/2.png') },
        { title: "Agenda", image: require('@/assets/images/3.png') },
        { title: "Documents", image: require('@/assets/images/4.png') },
        { title: "Polls", image: require('@/assets/images/5.png') },
        { title: "Questions", image: require('@/assets/images/6.png') },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.topBar}>
                <Image source={require('../assets/images/logo_converge.png')} style={styles.logoImage} />
                <TouchableOpacity onPress={() => router.push('/announcements')}>
                    <View style={styles.notificationIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color="#000" />
                        <View style={styles.notificationBadge}>
                            <ThemedText style={styles.notificationBadgeText}>{ctx?.notificationCount}</ThemedText>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <SimpleLineIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
                {/* <Ionicons name="person-circle-outline" size={24} color="#000" /> */}
            </View>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#FFFFFF', dark: '#fff' }}
                headerImage={
                    <View style={styles.header}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", marginBottom: 20 }}>
                            <ThemedText style={[styles.welcomeText, {
                                fontSize: 18,
                                color: "grey"
                            }]}>Hello,</ThemedText>
                            <ThemedText style={styles.welcomeText}>{userData?.name}</ThemedText>
                        </View>

                        <ThemedText style={styles.nameText}>Welcome to the 2024 Board Retreat</ThemedText>
                    </View>
                }>
                <ThemedView style={styles.container}>
                    {navItems.map((item, index) => (
                        <NavCard
                            key={index}
                            title={item.title}
                            image={item.image}
                            onPress={() => router.push(`/${item.title.toLowerCase()}` as Href<string | object>)}
                        />
                    ))}
                </ThemedView>
            </ParallaxScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //gap: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginRight: 40,
        paddingTop: 55, // Adjusted paddingTop to lower the top bar
    },
    notificationIconContainer: {
        position: 'relative',
        paddingTop: 5, // Add some padding to lower the notification icon
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    header: {
        padding: 20,
        paddingTop: 40, // Adjusted paddingTop to balance the header content
        backgroundColor: "#fff",
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    nameText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#000',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
    },
    card: {
        width: '48%',
        aspectRatio: 181 / 250,
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    cardBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cardImage: {
        borderRadius: 10,
    },
    cardOverlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 15,
    },
    cardTextContainer: {
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '900',
        // fontFamily: "Inter_900Black",
        color: 'white',
        marginBottom: 5,

    },
    cardSubtitle: {
        fontSize: 12,
        color: 'white',
    },
    imageContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // backgroundColor: '#f0f0f0'
    },
    logoImage: {
        justifyContent: 'center',
        resizeMode: 'contain',
        width: 300,
        height: 45,
        right: 40
        // backgroundColor: 'red'
    },
});
