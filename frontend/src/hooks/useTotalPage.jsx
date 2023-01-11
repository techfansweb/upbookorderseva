const useTotalPage = (dataLength, limit) => {


    let totalPage = dataLength > limit ? dataLength / limit : 1

    if (totalPage.toString().includes(".")) {
        const index = totalPage.toString().indexOf(".")
        totalPage = +totalPage.toString().slice(0, index) + 1
    }

    return totalPage
}

export default useTotalPage