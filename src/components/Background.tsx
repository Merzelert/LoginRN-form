import React from 'react';
import { View } from 'react-native';

export const Background = () => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#5856D6',
                height: 1000,
                width: 1200,
                top: -150,
                left: -50,
                transform: [{ rotate: '-55deg' }],
            }}
        />
    );
};
