import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user: [],
    isAuthenticated: false,
    accessToken: null,
    isLoading: true,
    isErorr: null
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState,

        reducers: {

            setUser: (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isAuthenticated = true
            },
            setToken: (state, action) => {
                state.accessToken = action.payload;

            },
            setErorr: (state, action) => {
                state.isErorr = action.payload
            },
            setLoading: (state, action) => {
                state.isLoading = action.payload
            }
        }
    }
);


export const { setUser, setToken, setErorr, setLoading } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.accessToken;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectisLaoding = (state) => state.auth.isLoading



export default authSlice.reducer