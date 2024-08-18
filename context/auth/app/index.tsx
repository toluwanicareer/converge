//create context for notification, it should have a state for notification count and a function to update the notification count

import { BaseUrl } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface NotificationContextType {
    notificationCount: number;
    updateNotificationCount: (count: number) => void;
    announcements: any
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const updateNotificationCount = (count: number) => {
        setNotificationCount(count);
        AsyncStorage.setItem('notificationCount', count.toString());
    };

    useEffect(() => {
        AsyncStorage.getItem('notificationCount').then((count) => {
            if (count) {
                setNotificationCount(parseInt(count));
            }
        }
        );

        AsyncStorage.getItem('announcements').then((announcement) => {
            if ( announcement ) {
                setAnnouncements(announcements);
            }
        })

    }, []);

    useEffect(() => {
        // Initial fetch
        fetchAnnouncements();

        // Set up interval to refresh announcements every 10 seconds
        const interval = setInterval(() => {
            fetchAnnouncements();
        }, 3600000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const fetchAnnouncements = async () => {
        const session = await AsyncStorage.getItem('session');

        if( session ) {
            const { email } = JSON.parse(session);
            // Here you would typically make an API call to fetch the latest announcements
            // const response = await fetch(`${BaseUrl}/announcement`);
            const response = await fetch(`${BaseUrl}/announcement`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    email 
                }),
            });
            const data = await response.json();
            const oldAnnouncement = announcements;
            setAnnouncements(data.data);
            AsyncStorage.setItem('announcements', JSON.stringify(data.data))
            const diff = data.data.length - oldAnnouncement.length;
            console.log('Diff', diff)
            setNotificationCount((prev) => prev + diff);


        }
    };


    return (
        <NotificationContext.Provider value={{ notificationCount, updateNotificationCount, announcements}}>
            {children}
        </NotificationContext.Provider>
    );
};

// export const useNotification = () => {
//     const context = useContext(NotificationContext);
//     if (!context) {
//         throw new Error('useNotification must be used within a NotificationProvider');
//     }
//     return context;
// };


