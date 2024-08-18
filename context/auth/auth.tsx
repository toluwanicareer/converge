import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { signIn as signInApi, signOut as signOutApi } from '../../api/api';
import { Alert } from 'react-native';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () =>  Promise.resolve(),
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (username: string, password: string) => {
    try {
      const { status, data } = await signInApi(username, password); // Use the API function
      if ( status === 200 ) {
        setSession(JSON.stringify(data.data)); // Set loading state
        return;
      }
      // setSession([false, token]); // Save the session token
    } catch (error: any) {
      // console.error('Sign-in failed:', error);
      Alert.alert('Error', error.message)
      setSession(null); // Reset session on failure
    }
  };

  const signOut = () => {
    setSession(null);
    // Optionally, call signOutApi to log out the user on the server side
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}