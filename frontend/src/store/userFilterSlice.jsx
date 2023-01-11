import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    start: false,
    error: false,
    errorMsg: "",
    totalPage: 0,
    currentPage: 1,
    allData: [],
    prevSuccess : false,
    nextSuccess : false
}

export const userFilterSlice = createSlice({
    name: 'userFilter',
    initialState,
    reducers: {
        userFilterStart: (state) => {
            state.start = true
            state.error = false
        },
        userFilterSuccess: (state, action) => {
            state.allData = action.payload[0]
            state.totalPage = action.payload[1]
            state.error = false
            state.errorMsg = ""
            state.start = false
        },
        userFilterError: (state, action) => {
            state.error = true
            state.errorMsg = action.payload
            state.start = false
        },
        userIncress: (state) => {
            state.currentPage = state.currentPage + 1
            state.nextSuccess = true
            state.prevSuccess = false
        },
        userDecress: (state, action) => {
            state.currentPage = action.payload || state.currentPage - 1
            state.nextSuccess = false
            state.prevSuccess = true
        },
    },
})
export const { userIncress, userDecress, userFilterStart, userFilterSuccess, userFilterError } = userFilterSlice.actions
export default userFilterSlice.reducer