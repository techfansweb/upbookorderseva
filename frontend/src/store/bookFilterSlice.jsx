import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPage: 0,
    currentPage: 1,
    allBookFilterData: [],
    countAll: {},
    nextSuccessStatus: false,
    prevSuccessStatus: false
}

export const bookFilterSlice = createSlice({
    name: 'bookFilter',
    initialState,
    reducers: {
        bookFilterSuccess: (state, action) => {
            state.allBookFilterData = action.payload[0]
            state.totalPage = action.payload[1]
            state.countAll = action.payload[2]
            state.error = false
            state.errorMsg = ""
            state.start = false
            state.success = true
        },
        bookIncress: (state) => {
            state.nextSuccessStatus = true
            state.prevSuccessStatus = false
            state.currentPage = state.currentPage + 1
        },
        bookDecress: (state, action) => {
            state.nextSuccessStatus = false
            state.prevSuccessStatus = true
            state.currentPage = action.payload || state.currentPage - 1
        },
        bookFilterRemove: (state) => {
            state.allBookFilterData = []
            state.totalPage = 1
            state.currentPage = 1
            state.countAll = {}
        }
    },
})
export const { bookFilterRemove, bookIncress, bookDecress, bookFilterStart, bookFilterSuccess, bookFilterError } = bookFilterSlice.actions
export default bookFilterSlice.reducer