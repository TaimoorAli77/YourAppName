// import React, { useState, useEffect } from 'react';
// import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
import ToastManager, { Toast } from 'toastify-react-native';
import { useEffect, useState } from 'react';
import URL from '../Url';
import axios from 'axios';
import GetCropType from '../pages/crop/GetCropType';
export default function CropType() {
    const [cropType, setCropType] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setProfileImage(result?.assets[0]);
        }
    };
    const addCropTypeData = async () => {
        console.log(cropType, description, profileImage?.uri)
        try {

            const formData = new FormData();
            formData.append('cropType', cropType);
            formData.append('description', description);
            if (!cropType) {
                setErrorMsg('Error: Crop Type is required');
                return;
            }
            if (!description) {
                setErrorMsg('Error: Description is required');
                return;
            }
            if (profileImage) {
                formData.append('image', {
                    uri: profileImage?.uri,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                });
            } else {
                setErrorMsg('Error: Image is required');
                return;
            }

            // Check if description is empty
            const response = await axios.post(`${URL}/croptype`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            Alert.alert("Added successfully crop type data")
            console.log(response.data);
            // Handle success or navigate to another screen
            setCropType('');
            setDescription('');
            setProfileImage(null);

        } catch (error) {
            console.error("upload crop type formd", error);
            // console.log(error.response)
            // Handle error
        }
        // const cropData = {
        //     imageUrl: '../images/one.png',
        //     cropName: 'Tomatoes',
        //     description: 'Tomatoes are red and delicious.',
        // };

    }
    return (<View>
        <ToastManager />
        <Text style={{
            textAlign: 'center', fontSize: 24, color: '#00b386',
            fontWeight: 'bold',
            marginBottom: 4,
        }}> Crop</Text>
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Text style={styles.label}>Crop Type:</Text>
                <TextInput style={styles.input} value={cropType} onChangeText={setCropType} onPressIn={() => { setErrorMsg(null) }} />
                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription} onPressIn={() => { setErrorMsg(null) }} />
                <View >
                    <Text style={styles.label}>Add Crop Image:</Text>
                    <TouchableOpacity onPress={selectImage} onPressIn={() => { setErrorMsg(null) }}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage.uri }} style={styles.profileImage} name="image" />
                        ) : (
                            <Image
                                source={require('../images/one.png')}
                                style={styles.profileImage}
                                name="image"
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red' }}>{errorMsg}</Text>
                <TouchableOpacity style={styles.btn}>
                    <Button color={'black'} style={styles.btn} title="Add Crop Type Data" onPress={addCropTypeData} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>Crop Types Data Detail</Text>
        </View>

        <View style={styles.containerTwo}>
            <GetCropType />
        </View>
    </View>
    );
}
const styles = StyleSheet.create({

    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 16,
    },
    profileImage: {
        width: 100,
        height: 80,
        borderRadius: 100,
        alignSelf: 'center',
    },
    btn: {
        width: '100%',
        borderRadius: 10,

    },
    button: {
        backgroundColor: '#00b386',
        borderRadius: 20,
        height: 45,
        justifyContent: 'center',
        width: 327,
        marginTop: 15,
        marginBottom: 15

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    input: {
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 10,
    },
    headingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    }

})