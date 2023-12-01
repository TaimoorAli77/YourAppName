import { View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        flexDirection: "row",  //horizontal
        justifyContent: "center", //Main axis
        alignItems: "center", // secondary axis
        // flexWrap: "wrap",  // with wrap on positions and shrink don't workout
        alignContent: "center"

      }}
    >

      <View
        style={{
          backgroundColor: "dodgerblue",
          width: 100,
          // flexBasis: 100, // as width or height
          height: 100,
          // flex: 1,  // short for flex grow or flex shrink
          // flexShrink: 1
          flex: -1
          // alignSelf:"flex-start"
        }}
      />

      <View
        style={{
          backgroundColor: "gold",
          width: 100,
          height: 100,
          top: 20,
          right: 20,

          position: "relative"
        }}
      />


      <View
        style={{
          backgroundColor: "tomato",
          width: 100,
          height: 100
        }}
      />
      {/* <View
        style={{
          backgroundColor: "grey",
          width: 100,
          height: 100
        }}
      />
      <View
        style={{
          backgroundColor: "greenyellow",
          width: 100,
          height: 100
        }}
      /> */}



    </View>


  );
}


