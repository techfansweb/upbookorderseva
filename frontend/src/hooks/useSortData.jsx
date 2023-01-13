import dayjs from "dayjs"


const useSortData = (data) => {

    const sortData = data.sort((a, b) => {
        
        const item1 = a.norder + a.iorder
        const item2 = b.norder + b.iorder
        return item2 - item1
    })
    
    return sortData
}

export const useShortDataByDate = (data) => {

    const sortData = data.sort((a, b) => {

        const date1 = dayjs(a.date).startOf("date").valueOf()
        const date2 = dayjs(b.date).startOf("date").valueOf()
        return date1 - date2
    })

    return sortData
}

export default useSortData