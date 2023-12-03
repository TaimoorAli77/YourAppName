import { SafeAreaView, Text, View } from "react-native";
// import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            {/* <Navbar /> */}
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View >
                    <Text
                    > Welcome to Home Page</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

export default Home;
