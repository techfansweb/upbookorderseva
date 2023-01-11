import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookAddStartStatus: false,
    bookAddErrorStatus: false,
    bookAddErrorMsg: "",
    bookAddSuccessStatus: false,
}

export const bookAddSlice = createSlice({
    name: 'bookAdd',
    initialState,
    reducers: {
        bookAddStart: (state) => {
            state.bookAddStartStatus = true
            state.bookAddErrorStatus = false
            state.bookAddErrorMsg = ""
            state.bookAddSuccessStatus = false
        },
        bookAddSuccess: (state) => {
            state.bookAddErrorStatus = false
            state.bookAddErrorMsg = ""
            state.bookAddStartStatus = false
            state.bookAddSuccessStatus = true
        },
        bookAddError: (state, action) => {
            state.bookAddErrorStatus = true
            state.bookAddErrorMsg = action.payload
            state.bookAddStartStatus = false
            state.bookAddSuccessStatus = false
        },
        bookAddSuccessToFalse : (state) => {
            state.bookAddSuccessStatus = false
        }
    },
})

export const {bookAddSuccessToFalse, bookAddStart, bookAddSuccess, bookAddError } = bookAddSlice.actions
export default bookAddSlice.reducer