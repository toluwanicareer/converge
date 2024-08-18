import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, BaseUrl } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Questions } from '@/services/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import useSession from '@/hooks/useSession';
import AsyncStorage from '@react-native-async-storage/async-storage';


const QuestionItem: React.FC<{ question: any, likeQuestion: any, likedQuestions: any }> = ({ question, likeQuestion, likedQuestions }) => {
  const isLiked = likedQuestions.includes(question._id);
  return (
    <View style={styles.questionItem}>
      <AntDesign name="user" size={24} color="#ffa200" />
      <View style={styles.questionContent}>
        <View style={styles.questionHeader}>
          <ThemedText style={styles.userName}>{question.createdBy}</ThemedText>
          <TouchableOpacity onPress={() => {
            !isLiked ? likeQuestion(question._id) : null
          }}>
            <View style={styles.likeContainer}>
              <ThemedText style={styles.likeCount}>{question.likeCount}</ThemedText>
              <Ionicons name="thumbs-up" size={16} color={isLiked ? "#FF9500" : "#000"} />
            </View>
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.questionTime}>{new Date(question.createdAt).toLocaleDateString()}- {new Date(question.createdAt).toLocaleTimeString()}</ThemedText>
        <ThemedText style={styles.questionText}>{question.question}</ThemedText>
      </View>
    </View>
  )
};

export default function QuestionsScreen() {
  const [newQuestion, setNewQuestion] = useState('');
  const colorScheme = useColorScheme();

  const [questions, setQuestion] = useState<any[]>([]);
  const { session, loading: sessionIsFetching } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [likedQuestions, setLikedQuestions] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('time');


  const sortedQuestions = useMemo(() => {
    if (sortBy === 'likes') {
      return [...questions].sort((a, b) => b.likeCount - a.likeCount);
    } else {
      return [...questions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [questions, sortBy]);

  useEffect(() => {

    if (session && !sessionIsFetching) {
      console.log('Session', session);
      setUserData(session);
    }
  }, [session]);

  const addQuestion = async () => {
    if (!newQuestion || loading) {
      return;
    }
    if (newQuestion.length > 200) {
      alert('Question cannot be more than 200 characters');
      return;
    }
    setLoading(true);
    await submitQuestion(newQuestion, userData.name);
    setNewQuestion('');
    await getQuestions();
    setLoading(false);
  };

  const likeQuestion = async (questionId: string) => {
    setLikedQuestions([...likedQuestions, questionId]);
    AsyncStorage.setItem('likedQuestions', JSON.stringify([...likedQuestions, questionId]));
    await fetch(`${BaseUrl}/questions/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionId }),
    });
    await getQuestions();
  }

  const submitQuestion = async (question: string, createdBy: string) => {
    await fetch(`${BaseUrl}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, createdBy }),
    });

  };

  const getQuestions = async () => {
    const response = await fetch(`${BaseUrl}/questions`);
    const data = await response.json();
    setQuestion(data.data);
  };

  useEffect(() => {

    getQuestions();
    AsyncStorage.getItem('likedQuestions').then((data) => {
      if (data) {
        setLikedQuestions(JSON.parse(data));
      }
    });
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getQuestions();
    setRefreshing(false);
  }, []);

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
        <TouchableOpacity onPress={addQuestion} style={styles.sendButton}>
          <ThemedText style={styles.sendButtonText}>Send {loading ? <ActivityIndicator></ActivityIndicator> : null}</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.sortContainer}>
        <ThemedText style={styles.sortLabel}>Sort by:</ThemedText>
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginVertical: 10
        }}>
          <ThemedText onPress={() => setSortBy('time')} style={{
            color: sortBy === 'time' ? '#FF9500' : '#000',
          }}>Time</ThemedText>
          <ThemedText style={{
            color: sortBy === 'likes' ? '#FF9500' : '#000',
          }} onPress={() => setSortBy('likes')} >Likes</ThemedText>
        </TouchableOpacity>
      </View>


      <ThemedText style={styles.questionsCount}>{questions?.length || 0} Questions</ThemedText>

      <FlatList
        data={sortedQuestions}
        renderItem={({ item }) => <QuestionItem likeQuestion={likeQuestion} question={item} likedQuestions={likedQuestions} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

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
    marginTop: 20,
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
    paddingHorizontal: 16,
    gap: 16,
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sortLabel: {
    fontSize: 17,
    marginRight: 8,
  },
  sortPicker: {
    flex: 1,
    height: 50,
  },
});