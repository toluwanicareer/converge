import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Questions } from '@/services/api';
import AntDesign from '@expo/vector-icons/AntDesign';

const QuestionItem: React.FC<{ question: Questions }> = ({ question }) => (
  <View style={styles.questionItem}>
      <AntDesign name="user" size={24} color="#ffa200" />
      <View style={styles.questionContent}>
      <View style={styles.questionHeader}>
        <ThemedText style={styles.userName}>{question.name}</ThemedText>
        <View style={styles.likeContainer}>
          <ThemedText style={styles.likeCount}>{question.likes}</ThemedText>
          <Ionicons name="thumbs-up" size={16} color="#FF9500" />
        </View>
      </View>
      <ThemedText style={styles.questionTime}>{question.time}</ThemedText>
      <ThemedText style={styles.questionText}>{question.text}</ThemedText>
    </View>
  </View>
);

export default function QuestionsScreen() {
  const [newQuestion, setNewQuestion] = useState('');
  const colorScheme = useColorScheme();

  const questions = [
    {
      id: '1',
      name: 'John Abraham',
      time: '20 mins ago',
      text: 'Does the company support and cover costs of external courses?',
      likes: 12,
      image: ''
    },
    {
      id: '2',
      name: 'Jerry Abraham',
      time: '20 mins ago',
      text: 'Does the company support and cover costs of external courses?',
      likes: 12,
      image: ''
    },
    // Add more questions here...
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Questions</ThemedText>
      </View>

      <View style={styles.askQuestionContainer}>
        <ThemedText style={styles.askQuestionTitle}>
          <Ionicons name="chatbubble-outline" size={20} color={Colors[colorScheme ?? 'light'].text} /> Ask a Question
        </ThemedText>
        <View style={styles.inputContainer}>
          <Ionicons name="create-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Type your question here"
            value={newQuestion}
            onChangeText={setNewQuestion}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <ThemedText style={styles.sendButtonText}>Send</ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.questionsCount}>10 Questions</ThemedText>

      <FlatList
        data={questions}
        renderItem={({ item }) => <QuestionItem question={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.questionsList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F2F2F7',
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: '#FFF',
  },
  backButton: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  backText: {
      fontSize: 17,
      marginLeft: 5,
  },
  headerTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
  },
  askQuestionContainer: {
      backgroundColor: '#FFF',
      padding: 16,
      marginBottom: 20,
  },
  askQuestionTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 12,
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F2F2F7',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
  },
  inputIcon: {
      marginRight: 8,
  },
  input: {
      flex: 1,
      fontSize: 17,
  },
  sendButton: {
      backgroundColor: '#FF9500',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      width: 100,
      alignSelf: 'flex-end'
  },
  sendButtonText: {
      color: '#FFF',
      fontSize: 17,
      fontWeight: 'bold',
  },
  questionsCount: {
      fontSize: 17,
      fontWeight: 'bold',
      marginLeft: 16,
      marginBottom: 12,
  },
  questionsList: {
      paddingHorizontal: 16,
  },
  questionItem: {
      flexDirection: 'row',
      marginBottom: 20,
      backgroundColor: '#FFF',
      borderRadius: 8,
      paddingVertical: 16,
      paddingRight: 16
  },
  userImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
  },
  questionContent: {
      flex: 1,
  },
  questionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
  },
  userName: {
      fontWeight: 'bold',
      fontSize: 17,
  },
  questionTime: {
      color: '#8E8E93',
      fontSize: 13,
      marginBottom: 8,
  },
  questionText: {
      fontSize: 15,
  },
  likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  likeCount: {
      fontSize: 13,
      marginRight: 4,
  },
});