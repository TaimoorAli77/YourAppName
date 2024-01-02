import React, { useState } from 'react';
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import URL from '../../Url';
const Crop = () => {
    const [cropName, setCropName] = useState('');
    const [cropType, setCropType] = useState('');
    const [cultivationDate, setCultivationDate] = useState('');
    const [area, setArea] = useState('');
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)
    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };
    const addCropData = async () => {
        try {
            if (cropName == "" || cropType == "" || cultivationDate == "" || area == "") {
                setErrorMsg("Fill all the fields")
                return;
            }
            else {
                setLoading(true); // Set loading to true while submitting
                await axios.post(`${URL}/addCrop`, {
                    cropName,
                    cropType,
                    cultivationDate,
                    area,
                });
                console.log('Crop data added successfully');
                // setCropName(''); setCultivationDate(""); setArea(''); setCropType('');
                // showDialog();
                // setInterval(() => {
                //     hideDialog();
                // }, 5000);
                // navigation.navigate('GetCrop')
                // props.navigation.navigate('GetCrop')
            }
        } catch (error) {
            console.error('Error adding crop data ff: ', error);
        } finally {
            setLoading(false); // Set loading back to false after submission
        }
        console.log('Add crops', { cropName, cropType, cultivationDate, area })
    };

    return (<>
        <Dialog
            visible={isDialogVisible}
            onTouchOutside={hideDialog}
            dialogTitle={<DialogTitle title="Success" />}
            footer={
                <DialogFooter>
                    {/* <DialogButton text="CANCEL" onPress={hideDialog} /> */}
                    <DialogButton text="OK" onPress={hideDialog} />
                </DialogFooter>
            }
        >
            <DialogContent>
                <View>
                    <Text>Data has been submitted successfully!</Text>
                </View>
            </DialogContent>
        </Dialog>

        <Text style={{
            textAlign: 'center', fontSize: 24, color: '#00b386',
            fontWeight: 'bold',
            marginBottom: 4,
        }}>Crop</Text>
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Text style={styles.label}>Crop Name:</Text>
                <TextInput style={styles.input} value={cropName} onChangeText={setCropName} onPressIn={() => { setErrorMsg(null) }} />

                <Text style={styles.label}>Crop Type:</Text>
                <TextInput style={styles.input} value={cropType} onChangeText={setCropType} onPressIn={() => { setErrorMsg(null) }} />

                <Text style={styles.label}>Cultivation Date:</Text>
                <TextInput style={styles.input} value={cultivationDate} onChangeText={setCultivationDate} onPressIn={() => { setErrorMsg(null) }} />

                <Text style={styles.label}>Area:</Text>
                <TextInput style={styles.input} value={area} onChangeText={setArea} onPressIn={() => { setErrorMsg(null) }} />

                <TouchableOpacity style={styles.button} onPress={addCropData}>
                    {/* <Text style={styles.buttonText}>Add Crop Data</Text> */}
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Add Crop Data</Text>
                    )}
                </TouchableOpacity>
                <Text style={{ color: 'red' }}>{errorMsg}</Text>
                {/* <Button  color={'#00b386'} title="Add Crop Data" onPress={addCropData} /> */}
            </View>
        </KeyboardAvoidingView>
    </>
    )
}

export default Crop

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
    // button: {
    //     // elevation: 0,
    //     // backgroundColor: 'white',
    //     borderRadius: 20,
    //     width: 50,
    //     marginTop: 20,
    // },
})