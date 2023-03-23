import React from 'react';
import { View } from 'react-native';

export const BackgroundProtectedS = () => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#e6e6ff',
                height: 1000,
                width: 1200,
                top: -150,
                left: -50,
                transform: [{ rotate: '-55deg' }],
            }}
        />
    );
};
