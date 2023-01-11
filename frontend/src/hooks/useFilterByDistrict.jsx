const useFilterByDistrict = (data, districtName) => {

    let dataArray = []

    data.map(item => {

        if (districtName == item.district) {
            dataArray.push(item)
        }
    })

    return dataArray
}

export default useFilterByDistrict