import { SafeAreaView, Text, View } from "react-native";

const Contact = ({ navigation }) => {
    return (
        <>
            <SafeAreaView>
                <View
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Text> Welcome to Contact Page</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

export default Contact;
