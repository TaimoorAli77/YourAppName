import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import DrawerNav from './Drawer/DrawerNav';
import URL from './Url';

const Stack = createStackNavigator();

export default function App({ token }) {
  // const {token} = route.params;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the authentication state, and update isAuthenticated accordingly
    // This is just a placeholder, replace it with your actual authentication logic
    const checkAuthentication = async () => {
      try {
        // Make a request to your backend to check authentication
        const response = await fetch(`${URL}/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer` + { token }, // Include any necessary headers
          },
        });

        if (response.ok) {
          // User is authenticated
          setIsAuthenticated(true);
        } else {
          // User is not authenticated
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Handle error (e.g., network error)
        console.error('Error checking authentication:', error);
      }
    };


    checkAuthentication();
  }, []);

  return (<>
    <NavigationContainer>
      <Stack.Navigator >
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
