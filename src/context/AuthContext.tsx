import React, { createContext, useEffect, useReducer } from 'react';
import { Usuario, LoginData, LoginResponse, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';
import cafeApi from '../api/cafeApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    errorMessages: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
};

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessages: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        //No token, no authenticated
        if (!token) {
            return dispatch({
                type: 'notAuthenticated',
            });
        }
        //Token, check if it is valid
        const resp = await cafeApi.get<LoginResponse>('/auth');
        if (resp.status !== 200) {
            return dispatch({
                type: 'notAuthenticated',
            });
        }
        await AsyncStorage.setItem('token', resp.data.token);
        //Token is valid
        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
            },
        });
    };

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const signIn = async ({ correo, password }: LoginData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                },
            });

            await AsyncStorage.setItem('token', resp.data.token);

        }
        catch (error: any) {
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Incorrect login data',
            });
        }
    };

    const signUp = async ({nombre, correo, password} : RegisterData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/usuarios', { nombre, correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                },
            });

            await AsyncStorage.setItem('token', resp.data.token);

        }
        catch (error: any) {
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Review your data',
            });
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'logOut',
        });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
