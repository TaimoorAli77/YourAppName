import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import DrawerNav from './Drawer/DrawerNav';
// import URL from './Url';

const Stack = createStackNavigator();

export default function App() {


    return (<>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' headerShown='none'>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="DrawerNav"
                    component={DrawerNav}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    </>
    );
}
