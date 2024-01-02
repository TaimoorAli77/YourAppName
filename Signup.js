import { View, StyleSheet, Text, SafeAreaView, StatusBar, Platform, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Keyboard, ScrollView } from "react-native";
import colors from './Colors.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState } from "react";
import URL from './Url.js'
import axios from 'axios';

const Signup = ({ navigation }) => {
    const handleSignInClick = () => {
        navigation.navigate('Login')
    }

    const [errorMsg, setErrorMsg] = useState(null)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: "",
        dob: ""
    });

    const sendToBackend = async () => {
        try {
            if (data.name === "" || data.email === "" || data.password === "" || data.cPassword === "" || data.dob === "") {
                setErrorMsg("All fields are required.");
                return;
            }

            if (data.password !== data.cPassword) {
                setErrorMsg("Both passwords should be the same");
                return;
            }

            const response = await fetch(`${URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (responseData.error) {
                setErrorMsg(responseData.error);
            } else {
                alert('Account created successfully');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error("Error during POST request:", error);
            setErrorMsg("An error occurred while creating the account");
        }
        // };


    }
    return (
        <>
            <TouchableWithoutFeedback>
                <KeyboardAvoidingView>
                    <SafeAreaView style={styles.main} onPress={Keyboard.dismiss} accessible={false}>
                        <Icon name="user-plus" size={70} color="#00b386" style={{
                            alignContent: "center", paddingTop: 70
                        }} />
                        <Text style={styles.welcome}>Create Account</Text>
                        <ScrollView >
                            <View>
                                <TextInput style={styles.inp} placeholder="Name" onChangeText={(text) => setData({ ...data, name: text })}
                                    onPressIn={() => { setErrorMsg(null) }}
                                />
                                <TextInput style={styles.inp} placeholder="Email" keyboardType="email-address"
                                    onChangeText={(text) => { setData({ ...data, email: text }) }}
                                    onPressIn={() => { setErrorMsg(null) }}
                                />
                                <TextInput style={styles.inp} placeholder="Password" secureTextEntry={true}
                                    onChangeText={(text) => { setData({ ...data, password: text }) }}
                                    onPressIn={() => { setErrorMsg(null) }}
                                />
                                <TextInput style={styles.inp} placeholder="Confirm Password" secureTextEntry={true}
                                    onChangeText={(text) => { setData({ ...data, cPassword: text }) }}
                                    onPressIn={() => { setErrorMsg(null) }}
                                />
                                <TextInput style={styles.inp} placeholder="Date of Birth"
                                    onChangeText={(text) => { setData({ ...data, dob: text }) }}
                                    onPressIn={() => { setErrorMsg(null) }}
                                />
                                {
                                    errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : null
                                }

                                <TouchableOpacity style={styles.btn} >
                                    <Button style={styles.btn} color={'#00b386'} title="Signup" onPress={() => { sendToBackend() }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ paddingTop: 10 }}>Already have an account? <Text style={{ color: "#00b386" }} onPress={handleSignInClick}>Login</Text></Text>
                        </ScrollView>

                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    );
}

export default Signup;

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.primary,
        // display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // justifyContent: "space-evenly",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // marginTop:30
    },
    forgotP: {
        color: "#00b386",
        alignSelf: "flex-end",
        marginTop: -13.5,
        fontSize: 12
    },
    inp: {
        height: 40,
        width: 275,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8
    },
    welcome: {
        fontSize: 33,
        color: "#00b386",
        marginBottom: 10
    },
    container: {
        height: 50,
        width: 50,
        top: 10,
        backgroundColor: colors.primary,
        left: 10,
    },
    image: {
        justifyContent: "center",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignContent: "center"
    },
    btn: {
        elevation: 0,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10
    },
    bottomBtnOne: {
        height: 50,
        width: 50,
        top: 10,
        position: "absolute",
        right: 10,
        backgroundColor: colors.secondary,
    },
})


