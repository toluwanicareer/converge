import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://buiuqttofugrdilmxudr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1aXVxdHRvZnVncmRpbG14dWRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzgzMjM0NiwiZXhwIjoyMDM5NDA4MzQ2fQ.JzQWFJk7KOQ7-rqh6jQoyChD_p6bX2finTVAMttNNoU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});