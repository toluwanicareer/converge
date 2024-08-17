import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const AgendaDetailsComponent = () => (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Agenda Details</Text>
        </View>

        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Retreat Agenda : August 30th, 2024</Text>

        {/* <AgendaItem
            number="1"
            time="09:00 - 09:05 AM"
            title="Opening Prayer"
            person="Lorato Morgano"
            role="Chairman, Access Bank Bostwana"
        /> */}

        <AgendaItem
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
        />

        <View style={{ backgroundColor: '#FFF5E6', padding: 15, borderRadius: 10, marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Tea Break</Text>
            <Text style={{ textAlign: 'center' }}>10:10 - 11:20 AM</Text>
        </View>
    </ScrollView>
);

export default AgendaDetailsComponent;