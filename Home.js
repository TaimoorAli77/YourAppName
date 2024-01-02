import { ScrollView, PanResponder, Animated, Image, ImageBackground, SafeAreaView, Text, View, StyleSheet, Platform, StatusBar } from "react-native";
import Crop from "./pages/crop/Crop";
// import Navbar from "./Navbar";
import React, { useRef } from 'react';

const Home = ({ navigation }) => {

    const scrollY = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dy: scrollY }],
                { useNativeDriver: false }
            ),
        })
    ).current;
    return (
        <>
            {/* <Navbar /> */}
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    <SafeAreaView style={styles.main}>
                        <View >
                            <Image style={styles.image} source={require('./assets/crop.png')} />
                            <Text style={styles.head}> Welcome to AgriCorp</Text>
                        </View>
                    </SafeAreaView>
                    <View style={styles.crop}>

                        <Crop />
                    </View>
                </ScrollView>
                <View
                    style={styles.scrollbar}
                    {...panResponder.panHandlers}
                />
            </View>
        </>
    );
}



export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    main: {
        // flex: 1,
        justifyContent: "top",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    crop: {
        marginTop: 76
    },
    // container: {
    //     // flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }
    scrollView: {
        flex: 1,
    },
    image: {
        width: 360,
        height: 290,
        bottom: -60,
        left: -59,
        position: 'absolute',
        resizeMode: 'contain', // 'cover' or 'contain' or 'stretch' or 'repeat' or 'center'
        borderRadius: 10, // Optional: Add borderRadius if you want rounded corners
    },
    scrollbar: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 8,
        borderRadius: 4,
        margin: 4,
    },
    head: {
        // color: "#00b386",
        color: "yellow",
        // textAlign: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
        top: 30,

        fontSize: 18,
        fontSize: 25
    }
});