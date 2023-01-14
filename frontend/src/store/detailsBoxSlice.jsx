import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    detailBoxStatus: false,
    detailBoxId : ""
}

export const detailsBoxSlice = createSlice({
    name: 'userDetailsBox',
    initialState,
    reducers: {
        detailBox: (state, action) => {
            state.detailBoxStatus = action.payload || !state.detailBoxStatus
            state.detailBoxId = action.payload || state.detailBoxId
        }
    },
})

export const { detailBox } = detailsBoxSlice.actions
export default detailsBoxSlice.reducer