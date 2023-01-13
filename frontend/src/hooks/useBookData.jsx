// custom hooks
import baseUrl from "./useBaseUrl"
import usePaginationIndex from "./usePaginationIndex"
import useTotalPage from "./useTotalPage"
import useNumber from "./useNumber"

// functions
import { bookLoadStart, bookLoadSuccess } from "../store/bookLoadSlice"
import { bookDecress, bookFilterSuccess } from "../store/bookFilterSlice"
import useDateFormet from "./useDateFormet"
import useTotalBooks from "./useTotalBooks"
import useFilterByMandal from "./useFilterByMandal"
import useTodayData from "./useTodayData"
import { getData } from "./useLocalStorage"
import isProd from "../isProd"
import { bookAddSuccessToFalse } from "../store/bookAddSlice"
import { useShortDataByDate } from "./useSortData"

export const useLoadBookData = async (dispatch, role, mandal, renderData) => {


    // start dispatch
    dispatch(bookLoadStart())

    try {

        // call api
        let reciveData
        if (isProd) {
            const { data } = await baseUrl.get("/bookorder") || []
            reciveData = data
        } else {
            reciveData = getData("book") || []
        }

        // filter data for by mandal
        if (role == "user") {
            reciveData = useFilterByMandal(reciveData, mandal)
        }

        // success dispatch
        if (renderData) {
            func(reciveData, dispatch, 1)
        }

        const todayData = useTodayData(reciveData)
        const totalCount = useTotalBooks(todayData)
        const shortData = useShortDataByDate(reciveData)
        useRenderBookData(shortData, dispatch, 1)
        dispatch(bookLoadSuccess([shortData, todayData, totalCount]))
        dispatch(bookAddSuccessToFalse())
    } catch (err) {
        console.log(err.message)
    }
}

export const useRenderBookData = (data, dispatch, currentPage) => {

    // if no data
    if (!data[0]) {
        return dispatch(bookFilterSuccess([[], 1, useTotalBooks([])]))
    }

    // map on all data
    let dataArray = data.map((item, i) => {

        const obj = {}

        obj.sn = useNumber(i + 1, 10)
        obj.id = item._id
        obj.mandal = item.mandal
        obj.fullname = item.district
        obj.district = item.district
        obj.date = item.date
        obj.subname = useDateFormet(item.date)
        obj.npost = item.npost
        obj.ipost = item.ipost
        obj.norder = item.norder
        obj.iorder = item.iorder
        return obj
    })

    let totalPage = +useTotalPage(data.length, 10)
    let [startIndex, endIndex] = usePaginationIndex(currentPage, 10)
    dataArray = dataArray.slice(startIndex, endIndex)

    if (currentPage > totalPage) {
        dispatch(bookDecress(totalPage))
    }

    const totalCount = useTotalBooks(data)
    dispatch(bookFilterSuccess([dataArray, totalPage, totalCount]))
}