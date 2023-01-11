// custom hooks
import baseUrl from "./useBaseUrl"
import usePaginationIndex from "./usePaginationIndex"
import useTotalPage from "./useTotalPage"
import useNumber from "./useNumber"

// functions
import { userDecress, userFilterSuccess } from "../store/userFilterSlice"
import { userLoadStart, userLoadSuccess } from "../store/userLoadSlice"
import { getData } from "./useLocalStorage"
import isProd from "../isProd"
import { userAddSuccess, userAddSuccessToFalse } from "../store/userAddSlice"

export const useLoadUserData = async (dispatch) => {

    // start dispatch
    dispatch(userLoadStart())

    try {

        // call api
        let reciveData
        if (isProd) {
            const { data } = await baseUrl.get("/user")
            reciveData = data
        } else {
            reciveData = getData("user")
        }


        // success dispatch
        useRenderUserData(reciveData, dispatch, 1)
        dispatch(userLoadSuccess(reciveData))
        dispatch(userAddSuccessToFalse())
    } catch (err) {
        console.log(err.message)
    }
}

export const useRenderUserData = (data, dispatch, currentPage) => {


    // if no data
    if (!data[0]) {
        return dispatch(userFilterSuccess([[], 1]))
    }
    // map on all data
    let dataArray = data.map((item, i) => {

        const obj = {}

        obj.sn = useNumber(i + 1, 10)
        obj.id = item._id
        obj.fullname = item.fullname
        obj.subname = item.mandal
        obj.number = item.number
        obj.password = item.password
        return obj
    })

    let totalPage = +useTotalPage(data.length, 10)
    let [startIndex, endIndex] = usePaginationIndex(currentPage, 10)
    dataArray = dataArray.slice(startIndex, endIndex)

    if (currentPage > totalPage) {
        dispatch(userDecress(totalPage))
    }

    dispatch(userFilterSuccess([dataArray, totalPage]))
}