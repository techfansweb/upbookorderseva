import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  imageDownloadStartStatus: false,
  imageDownloadSuccessStatus: false,
  pdfDownloadStartStatus: false,
  pdfDownloadSuccessStatus: false,
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
    },
    pdfDownloadStart: (state) => {
      state.pdfDownloadStartStatus = true
      state.pdfDownloadSuccessStatus = false
    },
    pdfDownloadSuccess: (state) => {
      state.pdfDownloadStartStatus = false
      state.pdfDownloadSuccessStatus = true
    },
  },
})

export const { pdfDownloadStart, pdfDownloadSuccess, imageDownloadStart, imageDownloadSuccess } = imageDownloadSlice.actions
export default imageDownloadSlice.reducer