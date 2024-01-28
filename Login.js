import { View, StyleSheet, Text, SafeAreaView, StatusBar, Platform, TextInput, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

import colors from './Colors.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
// import axios from "axios";
import URL from './Url.js'
// import App from "./App.js";
const Login = ({ navigation }) => {
    const handleSignupClick = () => {
        navigation.navigate('Signup')
    }
    const [errorMsg, setErrorMsg] = useState(null);
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const handleSignInClick = () => {
        console.log(data, URL)
        if (data.email === "" || data.password === "") {
            setErrorMsg("All fields are required.");
            return;
        }
        else {
            setLoading(true)
            try {
                fetch(`${URL}/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json()).then(
                        data => {
                            let newToken = data.token
                            if (data && data.token && data.token != null) {
                                AsyncStorage.setItem('token', newToken);
                                setToken(newToken)
                                setData({
                                    email: "",
                                    password: ""
                                });
                            }
                            console.log(newToken)
                            if (data.error) {
                                setErrorMsg(data.error)
                                console.log("data error ", data.error)
                            }
                            else {
                                alert("Login Successful")
                                navigation.navigate('DrawerNav', { token })
                            }
                        }
                    )
            } catch (error) {
                setErrorMsg("Check your credentials", error)
            }
            finally {
                setLoading(false)
            }
        }
    }
    return (
        <>
            {/* <App token={token} /> */}
            <SafeAreaView style={styles.main}>
                <Icon name="unlock" size={70} color="#00b386" style={{ alignContent: "center" }} />
                <View>
                    <Text style={styles.welcome}>       Agricrop</Text>
                    {
                        errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : null
                    }
                    <TextInput style={styles.inp} placeholder="Email" keyboardType="email-address"
                        value={data.email}
                        onChangeText={(t) => { setData({ ...data, email: t }) }}
                        onPressIn={() => { setErrorMsg(null) }}
                    />
                    <TextInput style={styles.inp} placeholder="Password" secureTextEntry={true}
                        value={data.password}
                        onChangeText={(t) => { setData({ ...data, password: t }) }}
                        onPressIn={() => { setErrorMsg(null) }}
                    />
                    <Text style={styles.forgotP}>Forgot Your Password ? </Text>
                    <TouchableOpacity style={styles.btn} >
                        <Button style={styles.btn} color={'#00b386'} title="Login" onPress={() => { handleSignInClick() }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ paddingTop: 10 }}>Don't have an account? <Text style={{ color: "#00b386" }} onPress={handleSignupClick}>Sign up</Text></Text>
            </SafeAreaView>

            {loading && <ActivityIndicator style={styles.activityIndicator} size="large" color="#00B386" />}
        </>
    );
}

export default Login;


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
    },
    forgotP: {
        color: "#00b386",
        alignSelf: "flex-end",
        marginTop: -13.5,
        fontSize: 12
    },
    inp: {
        height: 40,
        width: 255,
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
        marginTop: 20
    },
    bottomBtnOne: {
        height: 50,
        width: 50,
        top: 10,
        position: "absolute",
        right: 10,
        backgroundColor: colors.secondary,
    },
    activityIndicator: {
        marginTop: 20,
    }
})


