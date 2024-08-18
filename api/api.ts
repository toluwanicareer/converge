import axios from 'axios';
import { Alert } from 'react-native';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'http://192.168.43.152:3000', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});



// Function to handle sign in
export const signIn = async (email: string, password: string) => {
  const response = await apiClient.post('/user/login', { email, password });
  return response.data; // Assuming the response contains the token
};

// Function to handle sign out (if necessary)
export const signOut = async () => {
  const response = await apiClient.post('/auth/logout'); 
  return response.data;
};

export const getApi = async (url: string) => {
    try {
        const response = await apiClient.get(`${url}`); 
        return response;
        
    } catch (error: any) {
        Alert.alert('Error', error.message)
    }
}