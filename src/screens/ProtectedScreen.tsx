import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BackgroundProtectedS } from '../components/BackgroundProtectedS';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

const {user, token, logOut} = useContext(AuthContext);

    return (
        <>
        <BackgroundProtectedS/>
        <View style={styles.container}>
            <Text style={styles.title}>Protected Screen</Text>

            <Text style={{fontSize: 15}}>{JSON.stringify(user, null, 4)}</Text>
            <Text style={styles.textToken}>{token}</Text>
            <Button
                title="LogOut"
                color={'#5856D6'}
                onPress={logOut}
            />
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textToken: {
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
    },
});

