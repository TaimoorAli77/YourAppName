import { ImageBackground, View, StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import colors from './colors.js'
export default function App() {
  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        source={require('./assets/images.png')}
        style={styles.image}
        resizeMode="contain"
      >
        <View style={styles.container} />
        <View style={styles.bottomBtnOne} />
      </ImageBackground>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.dark,
    display: "flex",
    justifyContent: "space-evenly",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  bottomBtnOne: {
    height: 50,
    width: 50,
    top: 10,
    position: "absolute",
    right: 10,
    backgroundColor: colors.secondary,
  },
})


