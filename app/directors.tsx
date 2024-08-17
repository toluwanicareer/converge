import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const DirectorsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const colorScheme = useColorScheme();
    const [activeTab, setActiveTab] = useState('All Directors');
    const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);

    interface Director {
        id: string;
        name: string;
        team: string;
        company: string;
        email: string;
        whatsapp: string;
        summary: string;
        pix: string;
    };

    const directors: Director[] = [
        {
            id: '1',
            name: 'Toluwani Akano',
            team: 'CEO, Access Holdings',
            company: 'Access Holdings',
            email: 'toluwani@example.com',
            whatsapp: '+1234567890',
            summary: 'Toluwani is an experienced director with a background in finance and management.',
            pix: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&s',
        },
        {
            id: '2',
            name: 'Bolaji Agbede',
            team: 'Director',
            company: 'Access Insurance',
            email: 'emailaddress@accessbankplc.com',
            whatsapp: '+1234567890',
            summary: 'Lorem ipsum dolor sit amet consectetur. Maecenas diam fermentum cursus pharetra amet placerat. Euismod et enim morbi rhoncus id feugiat arcu eu. Viverra justo arcu enim dictum volutpat vitae nascetur urna vitae. Blandit mauris mattis vulputate nec amet tellus vel cursus ut. Malesuada sit lectus morbi quam in amet faucibus justo. Lectus orci pellentesque in neque quam pellentesque porttitor egestas. Bibendum nunc orci phasellus at aenean gravida enim lorem elementum. Elementum sagittis facilisis ut diam posuere arcu eu sit sed. Eu gravida amet risus interdum nec turpis.',
            pix: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&s',
        },
        // Add more directors with different companies here...
    ];

    const filterDirectors = (company: string) => {
        return directors.filter(director => 
            (company === 'All Directors' || director.company === company) &&
            director.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleDirectorSelect = (director: Director) => {
        setSelectedDirector(director);
    };

    const handleBack = () => {
        setSelectedDirector(null);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => (selectedDirector ? handleBack() : router.back())}>
                    <Ionicons name="arrow-back" size={17} color={Colors[colorScheme ?? 'light'].text} />
                </TouchableOpacity>
                <ThemedText onPress={() => (selectedDirector ? handleBack() : router.back())} style={styles.headerBack}>Back</ThemedText>
                <ThemedText style={styles.headerTitle}>Directors</ThemedText>
            </View>

            {selectedDirector ? (
                <View style={styles.detailsContainer}>
                    <Image source={{ uri: selectedDirector.pix }} style={styles.detailsImage} />
                    <Text style={styles.detailsName}>{selectedDirector.name}</Text>
                    <Text style={styles.detailsTeam}>{selectedDirector.team}</Text>
                    <Text style={styles.detailsTeam}>{selectedDirector.email}</Text>
                    <View style={styles.contactInfo}>
                        <Ionicons name="mail-open-outline" size={20} color="#000" />
                        <Ionicons name="logo-whatsapp" size={20} color="#000" />
                    </View>
                    <Text style={styles.detailsSummary}>{selectedDirector.summary}</Text>
                </View>
            ) : (
                <>
                    <View style={styles.tabsContainer}>
                        {['All Directors', 'Access Holdings', 'Access Insurance'].map(tab => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={[
                                    styles.tabButton,
                                    activeTab === tab && styles.activeTab
                                ]}
                            >
                                <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={Colors[colorScheme ?? 'light'].text} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for directors"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                        />
                    </View>

                    {filterDirectors(activeTab).map((director) => (
                        <View key={director.id} style={styles.directorCard}>
                            <View style={styles.directorInfo}>
                                <Image
                                    style={styles.directorImage}
                                    source={{ uri: director.pix }}
                                />
                                <View style={styles.directorTextContainer}>
                                    <Text style={styles.directorName}>{director.name}</Text>
                                    <Text style={styles.directorRole}>{director.team}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.readBioButton} onPress={() => handleDirectorSelect(director)}>
                                <Text style={styles.readBioText}>Read Bio</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerBack: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 90,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 30,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    tabButton: {
        padding: 4,
        borderBottomWidth: 4,
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#FF8200',
    },
    tabText: {
        fontSize: 16,
        color: 'gray',
    },
    activeTabText: {
        color: '#FF8200',
        fontWeight: 'bold',
        letterSpacing: 1.5
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
    directorCard: {
        alignItems: 'flex-start',
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        width: '88%',
        alignSelf: 'center',
        padding: 16,
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 2,
    },
    directorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 8,
    },
    directorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    directorTextContainer: {
        flex: 1,
    },
    directorName: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    directorRole: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
        letterSpacing: 0.3,
    },
    readBioButton: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FF8200',
        borderRadius: 8,
        alignSelf: 'stretch',
    },
    readBioText: {
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
    detailsContainer: {
        padding: 16,
        alignItems: 'center',
    },
    detailsImage: {
        width: '100%',
        height: 330,
        borderRadius: 10,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    detailsName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    detailsTeam: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 8,
        textAlign: 'center',
    },
    detailsCompany: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 10
    },
    contactText: {
        fontSize: 16,
        marginLeft: 8,
    },
    detailsSummary: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 16,
    },
});

export default DirectorsScreen;
