import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        alignSelf: 'center',
    },
    label: {
        fontSize: 18,
        color: 'white',
        marginTop: 20,
        left: 47,
    },
    inputField: {
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    buttonText: {
        color: '#5856D6',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextRegister: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'white',
        width: 300,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonRegister: {
        backgroundColor: 'transparent',
        width: 300,
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});
