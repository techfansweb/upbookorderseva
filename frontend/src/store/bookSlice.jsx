import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    today: {
        npost: 76,
        ipost: 67,
        norder: 67,
        iorder: 67
    },
    todayData: [
        {
            name: "Lucknow",
            norder: 76,
            iorder: 877
        },
        {
            name: "unnao",
            norder: 766,
            iorder: 87
        },
        {
            name: "unnao",
            norder: 766,
            iorder: 87
        }
    ],
    fillLists: [
        { lucknow: ["lucknow", "unnao", "hardoi", "sitapur", "lakhimpur"] }],
    fillStatus: true,
    fillStatusAll: false,
    allData: [{
        fullname: "Lucknow", // fullname means district
        subname: "10/01/0344", // subname means date
        npost: 1,
        ipost: 1,
        norder: 1,
        iorder: 1
    },
    {
        fullname: "Unnao", // fullname means district
        subname: "10/01/0344", // subname means date
        npost: 1,
        ipost: 1,
        norder: 1,
        iorder: 1
    }],
    countAll: {
        nPost: 76,
        iPost: 67,
        nOrder: 674,
        iOrder: 46
    },
    totalPage: 76,
    currentPage: 1,

}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        fillStatusAction: (state) => {
            state.fillStatus = true
        },
        currentIncress: (state) => {
            state.currentPage = state.currentPage + 1
        },
        currentDecress: (state) => {
            state.currentPage = state.currentPage - 1
        },
    },
})

export const { currentIncress, currentDecress, fillStatusAction } = bookSlice.actions
export default bookSlice.reducer