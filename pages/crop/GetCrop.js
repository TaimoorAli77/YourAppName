import React from 'react';
import { View, Text } from 'react-native';
import GetCropType from './GetCropType';

export default function componentName() {
    const cropData = {
        imageUrl: 'https://example.com/your-image.jpg',
        cropName: 'Tomatoes',
        description: 'Tomatoes are red and delicious.',
      };
    return (
        <View style={styles.container}>
      {/* <CropDetails {...cropData} /> */}
      <GetCropType />
    </View>
    );
}
