import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, BaseUrl } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Document, fetchData } from '@/services/api';



const DocumentItem: React.FC<{ document: any }> = ({ document }) => (
    <View style={styles.documentItem}>
        <View style={styles.documentInfo}>
            <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={24} color="red" />
                <ThemedText style={styles.pdfText}>{document.fileType ? document.fileType : 'PDF'}</ThemedText>
            </View>
            <View>
                <ThemedText style={styles.documentTitle}>{document.name}</ThemedText>
                <ThemedText style={styles.documentCreator}>Created by {document.createdBy}</ThemedText>
            </View>
        </View>
        <TouchableOpacity style={styles.downloadButton} onPress={() => Linking.openURL(document.url)}>
            <ThemedText style={styles.downloadButtonText}>Download Document</ThemedText>
        </TouchableOpacity>
    </View>
);

export default function DocumentsScreen() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const colorScheme = useColorScheme();

    useEffect(() => {
        const loadDocument = async () => {
            try {
                const result = await fetchData<any>(`${BaseUrl}/doc`);
                console.log(result);
                setDocuments(result.data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        loadDocument();
    }, []);



    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Documents</ThemedText>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors[colorScheme ?? 'light'].text} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for document"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                />
            </View>

            <FlatList
                data={documents.filter(document => document.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                renderItem={({ item }) => <DocumentItem document={item} />}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.documentList}
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
        marginBottom: 20,
        marginTop: 40,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
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
    documentList: {
        paddingHorizontal: 20,
    },
    documentItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    documentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        alignItems: 'center',
        marginRight: 15,
    },
    pdfText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
    },
    documentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    documentCreator: {
        fontSize: 14,
        color: '#666',
    },
    downloadButton: {
        backgroundColor: '#1E3A8A',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});                                       