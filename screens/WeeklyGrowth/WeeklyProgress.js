import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyProgress() {
    return (
        <View>
            <Text style={styles.heading}>Weekly Growth of Crops</Text>
            <Text style={styles.text}>Crop Type</Text>
            <Text style={styles.text}>Week Number</Text>
            <Text style={styles.text}>Size</Text>
            <Text style={styles.text}>Image</Text>
            <Text style={styles.text}>Notes</Text>


        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
        color: 'green'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontStyle: 'italic',
        fontWeight: '500',
        paddingLeft: 10
    }
})
