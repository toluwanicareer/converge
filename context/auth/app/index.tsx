//create context for notification, it should have a state for notification count and a function to update the notification count

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface NotificationContextType {
    notificationCount: number;
    updateNotificationCount: (count: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

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
    }, []);

    return (
        <NotificationContext.Provider value={{ notificationCount, updateNotificationCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};


