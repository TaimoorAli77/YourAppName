import { ImageBackground, View, StyleSheet, Text, SafeAreaView, StatusBar, Platform, TextInput, Button, TouchableOpacity } from "react-native";
import colors from './colors.js'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (
    <SafeAreaView style={styles.main}>
      <Icon name="unlock" size={70} color="#00b386" style={{ alignContent: "center" }} />
      <View>

        <Text style={styles.welcome}>  Welcome Back </Text>
        <TextInput style={styles.inp} placeholder="Email" />
        <TextInput style={styles.inp} placeholder="Password" secureTextEntry={true} />
        <Text style={styles.forgotP}>Forgot Your Password ? </Text>

        <TouchableOpacity style={styles.btn} >
          <Button style={styles.btn} color={'#00b386'} title="Login" />
        </TouchableOpacity>
      </View>
      <Text style={{ paddingTop: 10 }}>Don't have an account? <Text style={{ color: "#00b386" }}>Sign up</Text></Text>


    </SafeAreaView>
  );
}

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
})


