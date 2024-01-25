import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import URL from '../../Url';

const GetCropType = () => {
    const [cropTypeData, setCropTypeData] = useState([])
    useEffect(() => {
        try {
            const response = axios.get(`${URL}/croptype`);
            setCropTypeData(response.data)
            console.log(cropTypeData)
        } catch (error) {
            console.log(error)

        }

    }, []);
    return (
        // <View style={styles.container}>
        <FlatList
            data={cropTypeData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    {/* Display crop image */}
                    {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                    <Image source={require('../../images/prof.png')} style={styles.image} />

                    {/* Display crop type details */}
                    <View style={styles.textContainer}>
                        <Text style={styles.cropName}>Tomatoes</Text>
                        <Text style={styles.description}>Tomato are fresh.</Text>
                    </View>
                    {/* Add more fields as needed */}
                </View>
            )}
        />
            {/* Left side - Image */ }

    {/* Right side - Crop Name and Description */ }
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        margin: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    cropName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
    },
});

export default GetCropType;
