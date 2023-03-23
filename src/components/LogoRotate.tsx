import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const LogoComponent = () => {
    const [animatedValue] = useState(new Animated.Value(0));

    const rotateLogo = () => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            }),
        ).start();
    };

    useEffect(() => {
        rotateLogo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/react-logo-white.png')}
                style={{
                    transform: [{
                        rotate: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                        }),
                    }],
                    width: 110,
                    height: 100,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});
