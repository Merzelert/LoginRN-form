import { Usuario } from '../interfaces/appInterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    user: Usuario | null;
    errorMessages: string;
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logOut' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'signUp':
            return {
                ...state,
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                errorMessages: '',
            };
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessages: action.payload,
            };
        case 'removeError':
            return {
                ...state,
                errorMessages: '',
            };
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
            };
        case 'logOut':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

