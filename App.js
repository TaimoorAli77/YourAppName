import { SafeAreaView, Image, StyleSheet, Platform, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Button, Alert, StatusBar, Dimensions } from 'react-native';
import { useDeviceOrientation, useDimensions } from '@react-native-community/hooks';
export default function App() {
  // const pressFunc = () => {
  //   console.log("Taimooor Clicked Me")
  // }
  // console.log(Dimensions.get("screen"))
  // console.log(useDeviceOrientation())
  const  landscapee  = useDeviceOrientation()
  const { landscape } = landscapee
  console.log(landscapee)
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: landscapee==='landscape' ? "100%" : "50%",
          height: landscapee==='landscape' ? "100%" : "30%",
        }}
      >

      </View>



      {/* <Text> Welcome Taimoor Ali 2</Text> */}
      {/* <Text numberOfLines={1} onPress={() => { pressFunc() }}> Welcome Taimoor Ali 2 </Text> */}

      {/* <Image source={require('./assets/splash.png')} height={10} width={10}></Image> */}

      {/* <Button
        color={'green'}
        title='Click Me'
        onPress={
          () => { Alert.prompt('Taimoor give feedback', ' Its some App', text => console.log(text)) }
        }
      /> */}


      {/* 
      <Button
        color={'green'}
        title='my Btn'
        onPress={() => Alert.alert("New Title Taimoor", "Are you ready ? Message ", [
          { text: "Yes", onPress: () => { console.log("Yes") } },
          { text: "No", onPress: () => { console.log("No") } }
        ])}
      /> */}

      {/* <TouchableHighlight onPress={() => console.log("Image Taped")}>
        <Image
          blurRadius={10}
          fadeDuration={1000}
          source={{
            width: 200,
            height: 200,
            uri: "https://picsum.photos/200/300"
          }}>
        </Image> 
      </TouchableHighlight>  */}
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}

const containerStyle = { backgroundColor: 'pink' }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    // justifyContent: 'center',
  },
});
