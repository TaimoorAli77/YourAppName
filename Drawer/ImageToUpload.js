import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ImageToUpload = ({ navigation }) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState('Malik Taimoor Ali Awan')
    const [profileImage, setProfileImage] = useState(null);
    const [userName, setUserName] = useState('');

    const fetchUserData = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('token');
            if (storedUserData) {
                // const userData = JSON.parse(storedUserData);
                setUserName(storedUserData.name);
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        // Ask for camera and gallery permissions
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    }
    const Logout = async () => {
        try {
            const storedToken = await AsyncStorage.removeItem('token');
            if (storedToken !== null) {
                setToken(storedToken);
                console.log("Null token", storedToken)
                navigation.navigate('Login')
                alert("You have been logged out successfully.")
            }
            console.log(storedToken)
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage({ uri: result.uri });
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={selectImage}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
                    ) : (
                        <Image
                            source={require('../images/prof.png')}
                            style={styles.profileImage}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <Text style={styles.containerName}>{userName}</Text>
            <Text style={styles.containerName} onPress={() => Logout()}>Logout</Text>

            <View>
                <TouchableOpacity onPress={() => navigateToScreen('ProfileScreen')}>
                    <Text style={styles.containerName}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('Main')} token={token}>
                    <Text style={styles.containerName}>Crops</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('CropDetail')}>
                    <Text style={styles.containerName}>Crops Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('CropType')}>
                    <Text style={styles.containerName}>Crop Type</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('CropTypeDetail')}>
                    <Text style={styles.containerName}>Crop Type Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('DiseaseData')}>
                    <Text style={styles.containerName}>Disease</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('DiseaseList')}>
                    <Text style={styles.containerName}>Disease List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('WeeklyGrowth')}>
                    <Text style={styles.containerName}>Weekly Growth</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('WProgressReport')}>
                    <Text style={styles.containerName}>Weekly Progress Report</Text>
                </TouchableOpacity>
                {/* Add more drawer items as needed */}
            </View>

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 75,
    },
    containerName: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 10
    }
});

export default ImageToUpload;
