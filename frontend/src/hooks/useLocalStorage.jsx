export const addData = (key, data, role, password) => {

    const sectionArray = JSON.parse(localStorage.getItem(key)) || []

    // adding id on data
    const id = Date.now()
    data._id = id
    data.password = password || id
    data.role = role || "user"
    sectionArray.push(data)
    localStorage.setItem(key, JSON.stringify(sectionArray))
}

export const updateData = (key, data) => {

    localStorage.getItem(key) || localStorage.removeItem(key)
    localStorage.setItem(key, JSON.stringify(data))
}

export const getData = (key) => {

    return JSON.parse(localStorage.getItem(key))
}

export const removeData = (key, id) => {

    const sectionArray = JSON.parse(localStorage.getItem(key))

    let arr = []
    sectionArray.map((item, i) => {
        if (item._id == id) return
        arr.push(item)
    })

    localStorage.setItem(key, JSON.stringify(arr))
}