import { SafeAreaView, Text, View } from "react-native";

const About = ({ navigation }) => {
    return (
        <>
            <SafeAreaView>
                <View
                    onPress={() => { navigate('Home') }}
                >
                    <Text> Welcome to About Page</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

export default About;
