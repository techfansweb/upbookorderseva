import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookLoadStartStatus: false,
    bookLoadSuccessStatus: false,
    allBookData: [],
    allBookDataOfFiltered: [],
    todayData: [],
    todayCount: {}
}

export const bookLoadSlice = createSlice({
    name: 'bookLoad',
    initialState,
    reducers: {
        bookLoadStart: (state) => {
            state.bookLoadStartStatus = true
            state.bookLoadSuccessStatus = false
        },
        bookLoadSuccess: (state, action) => {
            state.allBookData = action.payload[0] || []
            state.todayData = action.payload[1] || []
            state.todayCount = action.payload[2] || {}
            state.bookLoadStartStatus = false
            state.bookLoadSuccessStatus = true
        },
        bookLoadError: (state) => {
            state.bookLoadStartStatus = false
            state.bookLoadSuccessStatus = false
        },
        bookLoadRemove: (state) => {
            state.allBookData = []
            state.bookLoadSuccessStatus = false
        },
        bookLoadFiltered: (state, action) => {
            state.allBookDataOfFiltered = action.payload
        }
    },
})

export const { bookLoadFiltered, bookLoadRemove, bookLoadStart, bookLoadSuccess, bookLoadError } = bookLoadSlice.actions
export default bookLoadSlice.reducer