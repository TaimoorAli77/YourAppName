import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import URL from '../Url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CropDetail() {
    const [token, setToken] = useState();
    const [cropData, setCropData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCropData();
    }, [cropData]);
    const getUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error('Error getting user token:', error);
            return null;
        }
    };
    const getCropData = async () => {
        // const storedToken = await AsyncStorage.getItem('token');
        // if (token) {
        //     console.log("Crops data token", storedToken);
        try {
            const token = await getUserToken();
            if (!token) {
                return;
            }
            const response = await axios.get(`${URL}/usercrops`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            setCropData(response?.data?.reverse());
        } catch (error) {
            console.error("Getting frontend crops data error", error);
        } finally {
            setLoading(false);
        }
        // }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <View style={styles.container}>
            {/* Heading Row */}
            <View style={styles.headingRow}>
                <Text style={styles.headingCell}>Crop Name</Text>
                <Text style={styles.headingCell}>Crop Type</Text>
                <Text style={styles.headingCell}>Area</Text>
                <Text style={styles.headingCell}>Cultivation Date</Text>
            </View>

            {/* Data Rows */}
            <FlatList
                data={cropData}
                renderItem={({ item, index }) => (
                    <View style={styles.itemView} key={index}>
                        <Text style={styles.cropName}>{item.cropName.length > 30 ? item.cropName.substring(0, 20) + '...' : item.cropName}</Text>
                        <Text style={styles.cropName}>{item.cropType.length > 30 ? item.cropType.substring(0, 20) + '...' : item.cropType}</Text>
                        <Text style={styles.cropName}>{item.area.length > 30 ? item.area.substring(0, 20) + '...' : item.area}</Text>
                        <Text style={styles.cropName}>{item.cultivationDate}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#00d1da', // Optional: Add a background color for the heading row
    },
    headingCell: {
        flex: 1,
        fontWeight: 'bold',
        padding: 10,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: 'white',
    },
    cropName: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 15,
    },
});
