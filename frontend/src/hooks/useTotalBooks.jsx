import MandalList from "../mandalList"
import useDistrictList, { useAllDistrict } from "./useDistrictList"

const useTotalBooks = (data) => {

    let obj = {
        npost: 0,
        ipost: 0,
        norder: 0,
        iorder: 0,
        totalPost: 0,
        totalOrder: 0
    }

    if (data[0]) {
        data.map(item => {

            obj.npost = +obj.npost + +item.npost
            obj.ipost = +obj.ipost + +item.ipost
            obj.norder = +obj.norder + +item.norder
            obj.iorder = +obj.iorder + +item.iorder
            obj.totalPost = +obj.totalPost + +item.npost + +item.ipost
            obj.totalOrder = +obj.totalOrder + +item.norder + +item.iorder
        })
    }

    return obj
}

export const useTotalBooksMandal = (filledData, mandalName, type) => {

    let data = MandalList
    if (mandalName && type) {
        data = useAllDistrict(mandalName)
    } else if (mandalName) {
        data = useDistrictList(mandalName)[0]
    }

    let arr = []
    data.map(item => {

        const mName = mandalName && type ? item : mandalName ? item : Object.keys(item)[0]
        let obj = {
            name: mName,
            norder: 0,
            iorder: 0,
            totalnorder: 0,
            totaliorder: 0
        }

        // map on filled data
        filledData.map(fillItem => {

            const dName = mandalName ? fillItem.district : fillItem.mandal
            if (dName == mName) {
                obj.name = mName
                obj.norder = obj.norder + +fillItem.norder
                obj.iorder = obj.iorder + +fillItem.iorder
            } else {
                obj.name = mName
                obj.norder = obj.norder
                obj.iorder = obj.iorder
            }
        })

        arr.push(obj)
    })

    return arr
}

export default useTotalBooks

