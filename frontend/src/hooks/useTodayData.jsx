import dayjs from "dayjs"

const useTodayData = (data) => {

    const dataArray = []

    data.map(item => {

        const todayDate = dayjs().startOf("date").valueOf()
        const date = dayjs(item.date).startOf("date").valueOf()
        if (date == todayDate) {
            return dataArray.push(item)
        }
    })
    return dataArray
}

export const useFilterByDateData = (data, dateForFilter) => {

    const dataArray = []

    data.map(item => {

        const todayDate = dayjs(dateForFilter).startOf("date").valueOf()
        const date = dayjs(item.date).startOf("date").valueOf()
        if (date == todayDate) {
            return dataArray.push(item)
        }
    })
    return dataArray
}

export default useTodayData