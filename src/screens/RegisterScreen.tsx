import React, { useContext, useEffect } from 'react';
import { Text, View, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}:Props) => {

    const {signUp, errorMessages, removeError} = useContext(AuthContext);

    const {email, password, name, onChange} = useForm({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (errorMessages.length === 0) { return; }
        Alert.alert('Incorrect register data', errorMessages, [
            {
                text: 'Ok',
                onPress: removeError,
            },
        ],);
    }, [errorMessages, removeError]);

    const onRegister = () => {
        console.log({name, email, password});
        Keyboard.dismiss();
        signUp({nombre: name, correo: email, password});
    };

    return (
        <>
            {/* background */}
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#5856D6' }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
            <View
                style={loginStyles.formContainer}
            >
                {/* logo */}
                <WhiteLogo />
                <Text style={loginStyles.title}>Register Screen</Text>
                <Text style={loginStyles.label}>Name</Text>
                <TextInput
                    style={loginStyles.inputField}
                    placeholder="Enter your name"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="white"
                    selectionColor="white"
                    onChangeText={(value) => onChange(value, 'name')}
                    value={name}
                    onSubmitEditing={onRegister}
                    />

                <Text style={loginStyles.label}>Email</Text>
                <TextInput
                    style={loginStyles.inputField}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="white"
                    selectionColor="white"
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                    onSubmitEditing={onRegister}
                    />

                <Text style={loginStyles.label}>Password</Text>
                <TextInput
                    style={loginStyles.inputField}
                    placeholder="* * * * * * * *"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="white"
                    selectionColor="white"
                    onChangeText={(value) => onChange(value, 'password')}
                    value={password}
                    onSubmitEditing={onRegister}
                    />
                {/* button */}
                <View style={loginStyles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={loginStyles.button}
                        onPress={onRegister}
                    >
                        <Text style={loginStyles.buttonText}>Create account</Text>
                    </TouchableOpacity>
                </View>
                {/* crear una nueva cuenta */}
                <View style={loginStyles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={loginStyles.buttonRegister}
                        onPress={() => navigation.replace('LoginScreen')}
                    >
                        <Text style={loginStyles.buttonTextRegister}>Back to login</Text>
                    </TouchableOpacity>
                </View>
                {/* keyboard avoid view */}
            </View>
            </KeyboardAvoidingView>
        </>
    );
};
