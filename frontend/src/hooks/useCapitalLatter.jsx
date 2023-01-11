const useCapitalLatter = (text) => {

    const firstLatterCap = text.slice(0, 1).toUpperCase()
    const allLatter = text.slice(1)
    return firstLatterCap + allLatter
}

export default useCapitalLatter