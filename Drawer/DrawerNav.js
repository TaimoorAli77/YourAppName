import { DrawerActions } from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './Main';
import Logout from './Logout';
import Image from './ImageToUpload';
import ImageToUpload from './ImageToUpload';
import Navbar from '../Navbar';
import GetCrop from '../pages/crop/GetCrop'
import Home from '../Home';
const Drawer = createDrawerNavigator();
const DrawerNav = () => {

    return (
        <>
            <Drawer.Navigator drawerContent={props => <ImageToUpload {...props} />}>
                <Drawer.Screen name="Main" component={Main} />
                <Drawer.Screen name="Navbar" component={Navbar} />

                {/* <Drawer.Screen name='Crops Detail History' component={GetCrop} /> */}

            </Drawer.Navigator>
        </>
    )
}


export default DrawerNav
