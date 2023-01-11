import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userAddStartStatus: false,
  userAddErrorStatus: false,
  userAddErrorMsg: "",
  userAddSuccessStatus: false
}

export const userAddSlice = createSlice({
  name: 'userAdd',
  initialState,
  reducers: {
    userAddStart: (state) => {
      state.userAddStartStatus = true
      state.userAddErrorStatus = false
      state.userAddErrorMsg = ""
    },
    userAddSuccess: (state, action) => {
      state.userAddErrorStatus = false
      state.userAddErrorMsg = ""
      state.userAddStartStatus = false
      state.userAddSuccessStatus = true
    },
    userAddError: (state, action) => {
      state.userAddErrorStatus = true
      state.userAddErrorMsg = action.payload
      state.userAddStartStatus = false
    },
    userAddSuccessToFalse: (state, action) => {
      state.userAddSuccessStatus = false
    }
  },
})

export const {userAddSuccessToFalse, userAddStart, userAddSuccess, userAddError } = userAddSlice.actions
export default userAddSlice.reducer