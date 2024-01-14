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
export default function CropType() {
    const [cropType, setCropType] = useState('');
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const [profileImage, setProfileImage] = useState(null);
    const addCropTypeData = async () => {
        console.log(cropType, description)
        try {
            // const formData = new FormData();
            // formData.append('cropType', cropType);
            // formData.append('description', description);
            // formData.append('image', profileImage.uri);

            let response = await axios.post(`${URL}/croptype`, { cropType, description }
                // , {
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                // }
            );
            // console.log(response);
            Alert.alert("Added successfully crop type data")
            // Handle success or navigate to another screen
        } catch (error) {
            console.error("upload crop type formd", error);
            // console.log(error.response)
            // Handle error
        }
    }
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
            setProfileImage({ uri: result.assets[0].uri });
        }
    };
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
                    <TouchableOpacity onPress={selectImage}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
                        ) : (
                            <Image
                                source={require('../images/one.png')}
                                style={styles.profileImage}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Button color={'black'} style={styles.btn} title="Add Crop Type Data" onPress={addCropTypeData} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
})