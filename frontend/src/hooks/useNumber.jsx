
const useNumber = (text, limit) => {

    const obj = {
        1 : "0",
        2 : "00",
        3 : "000"
    }

    if (text.toString().length < limit.toString().length) {
        text = obj[limit.toString().length - text.toString().length] + text.toString()
    }

    return text
}

export default useNumber