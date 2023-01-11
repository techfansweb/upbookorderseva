import useNumber from "./useNumber"

const useDateFormet = (date) => {

    if (!date) return


    const now = new Date(date)
    const day = useNumber(now.getDate(), 10)
    const month = useNumber(now.getMonth() + 1, 10)
    const year = now.getFullYear()

    return `${day}-${month}-${year}`
}

export default useDateFormet