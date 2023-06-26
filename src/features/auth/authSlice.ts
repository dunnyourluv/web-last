import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/auth.type";
interface AuthState {
    user: User | null;
    listUser: User[];
    login: {
        loading: boolean;
        error: string | null;
    };
    register: {
        loading: boolean;
        error: string | null;
    };
}

const initialState: AuthState = {
    user: null,
    login: {
        loading: false,
        error: null,
    },
    register: {
        loading: false,
        error: null,
    },
    listUser: [
        {
            email: "lethedung@gmail.com",
            id: "1",
            name: "Lê Thế Dũng",
            password: "123123123",
            phone: "1234567890",
        },
    ],
};

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        loginRequest(state) {
            state.login.loading = true;
            state.login.error = null;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.login.loading = false;
            state.user = action.payload;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.login.loading = false;
            state.login.error = action.payload;
        },
        registerRequest(state) {
            state.register.loading = true;
            state.register.error = null;
        },
        registerSuccess(state, action: PayloadAction<User>) {
            state.register.loading = false;
            state.listUser.push(action.payload);
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.register.loading = false;
            state.register.error = action.payload;
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
