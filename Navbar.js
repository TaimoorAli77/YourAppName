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
                    } else if (rn === 'Logout') {
                        iconName = focused ? 'sign-out' : 'sign-out';
                    }
                    return <Icon name={iconName} size={size} color={color} solid />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Contact" component={Contact} />
            <Tab.Screen name="Logout" component={About} />
        </Tab.Navigator>
    );
};

export default Navbar;
