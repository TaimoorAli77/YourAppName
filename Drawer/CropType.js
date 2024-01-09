// import React, { useState, useEffect } from 'react';
// import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

// import axios from 'axios';
// import URL from '../../Url';
// import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import ToastManager, { Toast } from 'toastify-react-native';
// import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export default function CropType() {
    const [cropType, setCropType] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const selectImage = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if (!response.didCancel) {
                setImageURL(response.uri);
                setErrorMsg(null);
            }
        });
    };

    const takePicture = () => {
        ImagePicker.launchCamera({}, (response) => {
            if (!response.didCancel) {
                setImageURL(response.uri);
                setErrorMsg(null);
            }
        });
    };

    const uploadImage = () => {
        // Implement your logic for uploading the image using the imageURL state.
        // For demonstration purposes, just show an alert with the selected image URL.
        Alert.alert('Image URL', imageURL);
    };

    const addCropTypeData = () => {
        console.log(cropType, description, imageURL)
    }
    // const [cultivationDate, setCultivationDate] = useState('');
    // const [isDialogVisible, setDialogVisible] = useState(false);
    // const [isLoading, setLoading] = useState(false);
    // const [errorMsg, setErrorMsg] = useState(null);
    // const navigation = useNavigation();
    // const showDialog = () => {
    //     setDialogVisible(true);
    // };

    // const hideDialog = () => {
    //     setDialogVisible(false);
    // };

    // const [token, setToken] = useState(null);

    // useEffect(() => {
    //     // Retrieve token from local storage when the component mounts
    //     retrieveToken();
    // }, []);

    // const retrieveToken = async () => {
    //     try {
    //         const storedToken = await AsyncStorage.getItem('token');
    //         if (storedToken !== null) {
    //             setToken(storedToken);
    //         }
    //     } catch (error) {
    //         console.error('Error retrieving token:', error);
    //     }
    // };

    // const addCropData = async () => {
    //     try {
    //         if (cropName == "" || cropType == "" || cultivationDate == "" || area == "") {
    //             setErrorMsg("Fill all the fields")
    //             return;
    //         }
    //         else {
    //             setLoading(true); // Set loading to true while submitting
    //             await axios.post(`${URL}/addcrop`, {
    //                 cropName,
    //                 cropType,
    //                 cultivationDate,
    //                 area,
    //             }, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             });
    //             console.log('Crop data added successfully');
    //             // setCropName(''); setCultivationDate(""); setArea(''); setCropType('');
    //             // showDialog();
    //             // setInterval(() => {
    //             //     hideDialog();
    //             // }, 5000);
    //             // navigation.navigate('GetCrop')
    //             // props.navigation.navigate('GetCrop')
    //             Toast.success('Data Submitted Successfully!');

    //         }
    //     } catch (error) {
    //         console.error('Error adding crop data ff: ', token, error);
    //     } finally {
    //         setLoading(false); // Set loading back to false after submission
    //     }
    //     console.log('Add crops', { cropName, cropType, cultivationDate, area })
    // };

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

                <View>
                    <Text style={styles.label}>Image URL:</Text>
                    <TextInput
                        style={styles.input}
                        value={imageURL}
                        onChangeText={(text) => setImageURL(text)}
                        onPressIn={() => setErrorMsg(null)}
                    />

                    {/* Display the selected/taken image */}
                    {imageURL ? <Image source={{ uri: imageURL }} style={{ width: 200, height: 200 }} /> : null}

                    <Button title="Select Image" onPress={selectImage} />
                    <Button title="Take Picture" onPress={takePicture} />
                    <Button title="Upload Image" onPress={uploadImage} />

                    {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
                </View>
                {/* <Text style={styles.buttonText}>Add Crop Data</Text> */}
                <Button color={'#00b386'} title="Add Crop Type Data" onPress={addCropTypeData} />
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
    button: {
        backgroundColor: '#00b386',
        borderRadius: 20,
        // paddingVertical: 10,
        // paddingHorizontal: 20,
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
        width: 327,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 10,
    },
})