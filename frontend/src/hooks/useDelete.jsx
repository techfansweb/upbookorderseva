const useDelete = (data, id) => {

    let arr = []

    data.map(item => {
        if (item._id == id) return
        arr.push(item)

    })

    return arr
}

export default useDelete