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
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
export default function CropType() {
    const [cropType, setCropType] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const [cropTypeData, setCropTypeData] = useState(null)

    const cropTypeDataGet = async () => {
        try {
            const response = await axios.get(`${URL}/croptype`, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token
                }
            });
            // setCropTypeData(response?.data)
            // console.log(response?.data)
        } catch (error) {
            console.log(error)

        }

    }

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
            setLoading(true)
            const response = await axios.post(`${URL}/croptype`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            setLoading(false)
            Alert.alert("Added successfully crop type data")
            setCropTypeData(response?.data)
            cropTypeDataGet()
            navigation.navigate('CropTypeDetail', { cropTypeData })
            // setCropTypeData();
            // Handle success or navigate to another screen
            setCropType('');
            setDescription('');
            setProfileImage(null);
            // cropTypeDataGet();

        } catch (error) {
            console.error("upload crop type formd", error);
            setLoading(false)
            // console.log(error.response)
            // Handle error
        }
        // const cropData = {
        //     imageUrl: '../images/one.png',
        //     cropName: 'Tomatoes',
        //     description: 'Tomatoes are red and delicious.',
        // };

    }
    // useEffect(() => {
    //     cropTypeDataGet();

    // }, [cropTypeData]);
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);
    return (<View>
        <ToastManager />
        <Text style={{
            textAlign: 'center', fontSize: 24, color: '#00b386',
            fontWeight: 'bold',
            marginBottom: 4,
        }}>Crop</Text>
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
        {loading &&
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00B386" />
            </View>
        }

        {/* <View style={styles.containerTwo}> */}
        {/* <View style={{ marginBottom: 16, paddingBottom: 16, height: 'auto' }}>
            <GetCropType cropType={cropTypeData} />
        </View> */}
        {/* </View> */}
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
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',


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