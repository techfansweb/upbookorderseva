import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  imageDownloadStartStatus: false,
  imageDownloadSuccessStatus: false
}

export const imageDownloadSlice = createSlice({
  name: 'imageDownload',
  initialState,
  reducers: {
    imageDownloadStart: (state) => {
      state.imageDownloadStartStatus = true
      state.imageDownloadSuccessStatus = false
    },
    imageDownloadSuccess: (state) => {
      state.imageDownloadStartStatus = false
      state.imageDownloadSuccessStatus = true
    }
  },
})

export const {imageDownloadStart, imageDownloadSuccess } = imageDownloadSlice.actions
export default imageDownloadSlice.reducer