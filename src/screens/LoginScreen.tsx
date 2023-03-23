import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessages, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (errorMessages.length === 0) { return; }
        Alert.alert('Incorrect login data', errorMessages, [
            {
                text: 'Ok',
                onPress: removeError,
            },
        ],);
    }, [errorMessages, removeError]);

    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();
        signIn({ correo: email, password });
    };

    return (
        <>
            {/* background */}
            <Background />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View
                    style={loginStyles.formContainer}
                >
                    {/* logo */}
                    <WhiteLogo />
                    <Text style={loginStyles.title}>Login Screen</Text>
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
                        onSubmitEditing={onLogin}
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
                        onSubmitEditing={onLogin}
                    />
                    {/* button */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    {/* crear una nueva cuenta */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={loginStyles.buttonRegister}
                            onPress={() => navigation.replace('RegisterScreen')}
                        >
                            <Text style={loginStyles.buttonTextRegister}>Create new account</Text>
                        </TouchableOpacity>
                    </View>
                    {/* keyboard avoid view */}
                </View>
            </KeyboardAvoidingView>
        </>
    );
};
