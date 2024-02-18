// DisplayDiseaseInfo.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import URL from '../../Url';

const GetDisease = ({ route }) => {
    const [diseaseData, setGetDisease] = useState([])

    const GetDiseaseData = async () => {
        const response = await axios.get(`${URL}/disease`)
        setGetDisease(response?.data)
    }
    const DisDa = route.params?.diseaseData || []
    useEffect(() => {
        GetDiseaseData();
    }, [DisDa])
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Disease Information</Text>
            <FlatList
                data={diseaseData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.cropDisease}>{item.DiseaseName}</Text>
                            <Text>{item.Description}</Text>
                        </View>
                        <View style={styles.image}>
                            <Image source={{ uri: `${URL}${item?.ImageURL}` }} style={{ width: 70, height: 70 }} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }, itemContainer: {
        flexDirection: 'row', // Align items horizontally
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }, itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    image: {
        flex: 1,
        alignItems: 'center',
        // width: 20,
        // height: 50,
        // borderRadius: 25,
        // paddingEnd: 35,
    }, cropDisease: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 2,
        marginStart: 5,
        padding: 10

    },
    left: {
        flex: 1, // Take up 1/2 of the available space
        width: '50%',
        height: '100'
    },
    right: {
        flex: 1, // Take up 1/2 of the available space
        alignItems: 'flex-start', // Align items to the right within the view
        width: '50%',
        height: '100'


    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
        color: 'red',
    },

});

export default GetDisease;
