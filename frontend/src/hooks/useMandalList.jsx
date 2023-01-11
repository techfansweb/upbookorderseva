import MandalList from "../mandalList"

const useMandalList = () => {

    const list = MandalList.map(mandal => {
        const [keys] = Object.keys(mandal)
        return keys
    })
    return list
}

export default useMandalList