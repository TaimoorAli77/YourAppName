import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageToUpload = () => {
    const [profileImage, setProfileImage] = useState(null);
    const Name = "Taimoor"
    useEffect(() => {
        // Ask for camera and gallery permissions
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
                        // <Text>Select Profile Image</Text>
                        // <Image source={require('..images/prof.png')} size={30} color="#4CAF50" />
                        <Image
                            source={require('../images/prof.png')}
                            style={{ width: 70, height: 70, }}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <Text style={styles.containerName}>{Name}</Text>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        display: 'flex'
    }
});

export default ImageToUpload;
