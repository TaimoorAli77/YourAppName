import { DrawerActions } from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './Main';
// import Logout from './Logout';
// import Image from './ImageToUpload';
import ImageToUpload from './ImageToUpload';
import ProfileScreen from './ProfileScreen';
import CropDetail from './CropDetail';
import CropType from './CropType'
import Disease from '../screens/Disease/Disease.js';
import GetCrop from '../pages/crop/GetCropType';
import GetDisease from '../screens/Disease/GetDisease.js';
import DiseaseApp from '../screens/Disease/DiseasApp.js';
import WeeklyProgress from '../screens/WeeklyGrowth/WeeklyProgress.js';
import WProgressReport from '../screens/WeeklyGrowth/WProgressReport.js';
// import GetCrop from '../pages/crop/GetCrop'
// import Home from '../Home';
const Drawer = createDrawerNavigator();
const DrawerNav = () => {

    return (
        <>
            <Drawer.Navigator initialRouteName='CropType' drawerContent={props => <ImageToUpload {...props} />}>
                <Drawer.Screen name="Main" component={Main} />
                {/* <Drawer.Screen name="Navbar" component={Navbar} /> */}
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                <Drawer.Screen name='CropDetail' component={CropDetail} />
                <Drawer.Screen name='CropType' component={CropType} />
                <Drawer.Screen name='CropTypeDetail' component={GetCrop} />
                <Drawer.Screen name='DiseaseData' component={Disease} />
                <Drawer.Screen name='DiseaseList' component={GetDisease} />
                <Drawer.Screen name='WeeklyGrowth' component={WeeklyProgress} />
                <Drawer.Screen name='WProgressReport' component={WProgressReport} />


                {/* <Drawer.Screen name='Crops Detail History' component={GetCrop} /> */}
            </Drawer.Navigator>
        </>
    )
}


export default DrawerNav
