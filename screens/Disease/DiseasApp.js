import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Disease from './Disease';
import GetDisease from './GetDisease';
import axios from 'axios';
import URL from '../../Url';
export default function DiseaseApp() {
    const [diseaseData, setDiseaseData] = useState([]);

    const getDiseaseData = async () => {
        try {
            const response = await axios.get(`${URL}/disease`);
            setDiseaseData(response?.data);
        } catch (error) {
            console.log('Error fetching disease data:', error);
        }
    };

    const updateDiseaseData = (newData) => {
        setDiseaseData((prevData) => [...prevData, newData]);
    };

    useEffect(() => {
        getDiseaseData();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Disease updateDiseaseData={updateDiseaseData} />
            <GetDisease diseaseData={diseaseData} />
        </View>
    );
}
