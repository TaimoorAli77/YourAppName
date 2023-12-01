import { ImageBackground, View, StyleSheet } from "react-native";

export default function App() {
  return (

    <ImageBackground
      source={require('./assets/images.png')}
      style={styles.image}
      resizeMode="cover"
    >
      <View
        style={styles.container}></View>
      <View style={styles.bottomBtnOne} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 60,
    width: "100%",
    backgroundColor: "dodgerblue",

  },
  image: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  bottomBtnOne: {
    height: 60,
    width: "100%",
    backgroundColor: "black",
  },
})


