
const usePaginationIndex = (currentPage, limit) => {

    let endIndex = currentPage * limit
    let startIndex = endIndex - limit
    return [startIndex, endIndex]
}

export default usePaginationIndex