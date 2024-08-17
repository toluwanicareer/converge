import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Href } from 'expo-router';

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

    const navItems = [
        { title: "Attendees", image: require('@/assets/images/1.png') },
        { title: "Speakers", image: require('@/assets/images/2.png') },
        { title: "Agenda", image: require('@/assets/images/3.png') },
        { title: "Documents", image: require('@/assets/images/4.png') },
        { title: "Polls", image: require('@/assets/images/5.png') },
        // { title: "Questions & Answers", image: require('@/assets/images/question.png') },
    ];

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#FFFFFF', dark: '#fff' }}
            headerImage={
                <View style={styles.header}>
                    <ThemedText style={styles.welcomeText}>Welcome,</ThemedText>
                    <ThemedText style={styles.nameText}>{userName}</ThemedText>
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
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        paddingTop: 90,
        backgroundColor: "#fff",
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    nameText: {
        fontSize: 20,
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
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 12,
        color: 'white',
    },
});