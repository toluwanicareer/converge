import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseUrl } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';

const AgendaItem = ({ number, time, title, person, role, details, setSpeaker, item }:
    {
        number: number, time: string, title: string, person?: string,
        role?: string, details?: string, setSpeaker: any, item: any
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
                    <TouchableOpacity onPress={() => setSpeaker(item)} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '90%'
                    }}>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>{person}</Text>
                            <Text style={{ color: '#666' }}>{role}</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#666" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
            )}
            {details && (
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
                    <Ionicons name="list-outline" size={20} color="#666" style={{ marginRight: 10, marginTop: 3 }} />
                    <View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Description:</Text>
                        <Text>{details}</Text>
                    </View>
                </View>
            )}
        </View>
    </View>
);

const AgendaDetailsComponent = () => {

    const [agendaItems, setAgendaItems] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    //get slug from router
    const router = useRouter();
    const { eventId } = useLocalSearchParams();
    const [speaker, setSpeaker] = React.useState<any>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/agenda`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventId }),
            });
            console.log(eventId)
            const data = await response.json();
            console.log(data);
            setAgendaItems(data.data);
        } catch (error) {
            console.error('Error loading agenda:', error);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const getTimeFromDate = (date: string) => {
        const d = new Date(date);
        return `${d.getHours()}:${d.getMinutes()}`
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
            <TouchableOpacity onPress={() => router.back()}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 50 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Agenda Details</Text>
                </View>
            </TouchableOpacity>

            {speaker ? (
                <View style={styles.detailsContainer}>
                    <Image source={{ uri: speaker.speakerId.user_id.pix }} style={styles.detailsImage} />
                    <Text style={styles.detailsName}>{speaker.speakerId.user_id.name}</Text>
                    <Text style={styles.detailsTeam}>{speaker.speakerId.position}</Text>
                    <Text style={styles.detailsTeam}>{speaker.speakerId.user_id.email}</Text>
                    <View style={styles.contactInfo}>
                        <Ionicons name="mail-open-outline" size={20} color="#000" />
                        <Ionicons name="logo-whatsapp" size={20} color="#000" />
                    </View>
                    <Text style={styles.detailsSummary}>{speaker.speakerId.bio}</Text>
                </View>
            ) : (
                <>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Retreat Agenda :{new Date(agendaItems?.[0]?.eventId.date).toLocaleDateString()}</Text>
                    {agendaItems && agendaItems.length > 0 && agendaItems.map((item, index) => (
                        <>
                            {item.format !== "break" ? (
                                <AgendaItem
                                    number={index + 1}
                                    time={getTimeFromDate(item.startTime) + ' - ' + getTimeFromDate(item.endTime)}
                                    title={item.title}
                                    person={item.speakerId.user_id.name}
                                    role={item.speakerId.user_id.team}
                                    details={item.description}
                                    setSpeaker={setSpeaker}
                                    item={item}
                                />
                            ) :
                                (
                                    <View style={{ backgroundColor: '#FFF5E6', padding: 15, borderRadius: 10, marginTop: 20, marginBottom: 20 }}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.title}</Text>
                                        <Text style={{ textAlign: 'center' }}>{getTimeFromDate(item.startTime) + ' - ' + getTimeFromDate(item.endTime)}</Text>
                                    </View>
                                )
                            }
                        </>

                    ))}
                </>
            )}






        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerBack: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 90,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 50,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    tabButton: {
        padding: 4,
        borderBottomWidth: 4,
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#FF8200',
    },
    tabText: {
        fontSize: 16,
        color: 'gray',
    },
    activeTabText: {
        color: '#FF8200',
        fontWeight: 'bold',
        letterSpacing: 1.5
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
    directorCard: {
        alignItems: 'flex-start',
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        width: '88%',
        alignSelf: 'center',
        padding: 16,
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 2,
    },
    directorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 8,
    },
    directorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    directorTextContainer: {
        flex: 1,
    },
    directorName: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    directorRole: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
        letterSpacing: 0.3,
    },
    readBioButton: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FF8200',
        borderRadius: 8,
        alignSelf: 'stretch',
    },
    readBioText: {
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
    detailsContainer: {
        padding: 16,
        alignItems: 'center',
    },
    detailsImage: {
        width: '100%',
        height: 330,
        borderRadius: 10,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    detailsName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    detailsTeam: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 8,
        textAlign: 'center',
    },
    detailsCompany: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 10
    },
    contactText: {
        fontSize: 16,
        marginLeft: 8,
    },
    detailsSummary: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 16,
    },
});

export default AgendaDetailsComponent;