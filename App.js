import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
import Navbar from './Navbar';

const Stack = createStackNavigator();

export default function App() {
  return (<>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name='Navbar' component={Navbar} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
  );
}
