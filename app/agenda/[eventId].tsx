import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getApi } from '@/api/api';
import { useLocalSearchParams } from 'expo-router';
import NoData from '@/components/NoData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface IEventAgenda {
    title: string;
    format: string;
    eventId: string;
    speakerId: string;
    description: string;
    startTime: string;
    endTime: string;
}

const AgendaItem = ({ number, time, title, person, role, details }:
    {
        number: string, time: string, title: string, person?: string,
        role?: string, details?: string[]
    }) => (
    <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ backgroundColor: '#F4A460', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{number}</Text>
            </View>
            <Text style={{ color: '#666' }}>{time}</Text>
        </View>
        <View style={{ backgroundColor: '#F0F0F0', borderRadius: 10, padding: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
            {person && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>{person}</Text>
                        <Text style={{ color: '#666' }}>{role}</Text>
                    </View>
                </View>
            )}
            {details && (
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
                    <Ionicons name="list-outline" size={20} color="#666" style={{ marginRight: 10, marginTop: 3 }} />
                    <View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Share:</Text>
                        {details.map((item, index) => (
                            <Text key={index} style={{ marginBottom: 3 }}>• {item}</Text>
                        ))}
                    </View>
                </View>
            )}
        </View>
    </View>
);

const AgendaDetailsComponent = () =>  {
    const {eventId} = useLocalSearchParams();
    const [agenda, setAgenda] = useState<IEventAgenda[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getApi(`/agenda/${eventId}`);
            console.log('Data By Id', response)
             if ( response ) {
                const { data } = response;
                setAgenda(data.data);
                return
             }

             setAgenda([]);
        }


        fetchData()
    }, [])

        return (
            
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}> */}
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Agenda Details</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.retreatAgenda}>Retreat Agenda : August 30th, 2024</Text>

                {/* <AgendaItem
                    number="1"
                    time="09:00 - 09:05 AM"
                    title="Opening Prayer"
                    person="Lorato Morgano"
                    role="Chairman, Access Bank Bostwana"
                /> */}

                { 
                agenda.length === 0 
                ? 
                <NoData/>:
                    agenda.map((data, index) => ( <AgendaItem 
                        number="2"
                        time={`${data.startTime.split('T')[0]} - ${data.endTime.split('T')[0]}`}
                        title={ data.title}
                        person="Lorato Morgano"
                        role="Chairman, Access Bank Bostwana"
                        details={['"Guess Who" game']}
                    /> ))
                }

                {/* <AgendaItem
                    number="2"
                    time="09:05 - 09:10 AM"
                    title="Ice Breaker"
                    person="Lorato Morgano"
                    role="Chairman, Access Bank Bostwana"
                    details={['"Guess Who" game']}
                />

                <AgendaItem
                    number="3"
                    time="09:10 - 09:20 AM"
                    title="Opening Remarks"
                    person="Aig Akmohede"
                    role="Chairman, Access Holdings"
                    details={[
                        'Objectives of the 2-days event',
                        'Expectations',
                        'Rules'
                    ]}
                /> */}

                <View style={{ backgroundColor: '#FFF5E6', padding: 15, borderRadius: 10, marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Tea Break</Text>
                    <Text style={{ textAlign: 'center' }}>10:10 - 11:20 AM</Text>
                </View>
            </ScrollView>
        )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 0,
    },
    retreatAgenda: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 20,
        paddingLeft: 20
    }
})


export default AgendaDetailsComponent;