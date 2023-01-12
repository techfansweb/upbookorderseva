import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import bookAddSlice from './bookAddSlice'
import bookFilterSlice from './bookFilterSlice'
import bookLoadSlice from './bookLoadSlice'
import bookSlice from './bookSlice'
import detailsBoxSlice from './detailsBoxSlice'
import imageDownloadSlice from './imageDownloadSlice'
import userAddSlice from './userAddSlice'
import userFilterSlice from './userFilterSlice'
import userLoadSlice from './userLoadSlice'

export const store = configureStore({
    reducer: {
        userAdds: userAddSlice,
        books: bookSlice,
        auths: authSlice,
        userLoads: userLoadSlice,
        bookAdds: bookAddSlice,
        bookLoads: bookLoadSlice,
        bookFilters: bookFilterSlice,
        userFilters: userFilterSlice,
        detailsBoxs : detailsBoxSlice,
        imageDownlaods : imageDownloadSlice
    },
})