import MandalList from "../mandalList"

const useDistrictList = (mandal, mandalLists) => {

    mandalLists = mandalLists || MandalList

    let arr = []
    const mandalList = mandalLists.map(mandalName => {

        if (Object.keys(mandalName)[0] == mandal) {
            const district = mandalName[mandal]
            arr.push(district)
        }
    })

    return arr
}

export const useAllDistrict = () => {

    let arr = []
    MandalList.map(item => {
        item[Object.keys(item)].map(district => {
            arr.push(district)
        })
    })
    return arr
}

export default useDistrictList