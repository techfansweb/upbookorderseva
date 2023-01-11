import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    start: false,
    error: false,
    errorMain: false,
    errorMsg: "",
    startStatus: true,
    auth: false,
    role: "",
    mandal: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutStart: (state) => {
            state.role = ""
            state.mandal = ""
            state.auth = false
        },
        loginStart: (state) => {
            state.start = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.auth = true
            state.mandal = action.payload.mandal || ""
            state.role = action.payload.role || ""
            state.start = false
            state.error = false
        },
        loginError: (state, action) => {
            state.errorMsg = action.payload
            state.start = false
            state.error = true
            state.auth = false
        },

        // for starting the load page
        authStart: (state, action) => {
            state.startStatus = true
        },
        authSuccess: (state, action) => {
            state.startStatus = false
            state.auth = true
            state.mandal = action.payload.mandal
            state.role = action.payload.role
        },
        authError: (state, action) => {
            state.startStatus = false
            state.auth = false
        }
    },
})

export const {
    authStart, authSuccess, authError,
    logoutStart, loginStart, loginSuccess, loginError,
} = authSlice.actions
export default authSlice.reducer