import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    startAll: false,
    startMain: false,
    errorAll: false,
    errorMsgAll: "",
    allUserData: [],
    success: false
}

export const userLoadSlice = createSlice({
    name: 'userLoads',
    initialState,
    reducers: {
        userLoadStart: (state) => {
            state.success = false
            state.startAll = true
            state.errorAll = false
        },
        userLoadSuccess: (state, action) => {
            state.startAll = false
            state.errorAll = false
            state.errorMsgAll = ""
            state.allUserData = action.payload || []
            state.success = true
        },
        userLoadError: (state, action) => {
            state.errorMsgAll = action.payload
            state.startAll = false
            state.errorAll = true
        },
        userLoadStartMain: (state) => {
            state.startMain = true
        },
        userLoadSuccessMain: (state) => {
            state.startMain = false
        }
    },
})

export const { userLoadStartMain, userLoadSuccessMain, userLoadStart, userLoadSuccess, userLoadError } = userLoadSlice.actions
export default userLoadSlice.reducer