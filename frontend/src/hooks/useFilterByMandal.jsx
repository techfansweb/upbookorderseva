const useFilterByMandal = (data, mandalName) => {

    if (!data) return
    
    const dataArray = []

    data.map(item => {

        if (mandalName == item.mandal) {
            dataArray.push(item)
        }
    })

    return dataArray
}

export default useFilterByMandal