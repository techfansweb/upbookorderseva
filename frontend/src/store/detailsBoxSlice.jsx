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
            state.detailBoxStatus = !state.detailBoxStatus
            state.detailBoxId = action.payload
        }
    },
})

export const { detailBox } = detailsBoxSlice.actions
export default detailsBoxSlice.reducer