// Navbar.js
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const Tab = createBottomTabNavigator();

const Navbar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (rn === 'Contact') {
                        iconName = focused ? 'list' : 'list';
                    } else if (rn === 'About') {
                        iconName = focused ? 'info-circle' : 'info-circle';
                    }
                    return <Icon name={iconName} size={size} color={color} solid />;
                },
            })}

        // screenOptions={{
        //     headerStyle: {
        //       backgroundColor: '#00b386', // Set your desired header color here
        //     },
        //     headerTintColor: 'white', // Set text color of header buttons
        //     headerTitleStyle: {
        //       fontWeight: 'bold',
        //     },
        //   }}
        >

            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen name="Contact" component={Contact}
                options={{
                    headerShown: false
                }} />
            <Tab.Screen name="About" component={About}
                options={{
                    headerShown: false
                }} />
        </Tab.Navigator>
    );
};

export default Navbar;
