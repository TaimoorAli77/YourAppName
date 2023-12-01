import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Image, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native';

export default function App() {
  // const pressFunc = () => {
  //   console.log("Taimooor Clicked Me")
  // }
  return (
    <SafeAreaView style={styles.container}>
      <Text> Welcome Taimoor Ali 2</Text>
      {/* <Text numberOfLines={1} onPress={() => { pressFunc() }}> Welcome Taimoor Ali 2 </Text> */}

      {/* <Image source={require('./assets/splash.png')} height={10} width={10}></Image> */}



      <TouchableHighlight onPress={() => console.log("Image Taped")}>
        <Image
          blurRadius={10}
          fadeDuration={1000}
          source={{
            width: 200,
            height: 200,
            uri: "https://picsum.photos/200/300"
          }}>
        </Image>
      </TouchableHighlight>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
