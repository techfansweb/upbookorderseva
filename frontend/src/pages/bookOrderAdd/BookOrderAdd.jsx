// react hooks
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// custom hooks
import useDistrictList from "../../hooks/useDistrictList"
import baseUrl from "../../hooks/useBaseUrl"
import useTitleTag from "../../hooks/useTitleTag"

// componant
import InputBox from "../../componants/inputBox/InputBox"
import Title from "../../componants/title/Title"
import Button from "../../componants/button/Button"
import Layout from "../../componants/layout/Layout"
import SelectBox from "../../componants/inputBox/SelectBox"
import Error from "../../componants/Error/Error"

// functions
import { bookAddError, bookAddStart, bookAddSuccess } from "../../store/bookAddSlice"
import useTodayData, { useFilterByDateData } from "../../hooks/useTodayData"
import useFilterByDistrict from "../../hooks/useFilterByDistrict"
import { useLoadBookData } from "../../hooks/useBookData"
import { addData } from "../../hooks/useLocalStorage"
import isProd from "../../isProd"

const BookOrderAdd = () => {

    // change title
    useTitleTag("Add Book Order")

    // use states
    const [district, setDistrict] = useState("")
    const [date, setDate] = useState("")
    const [nPost, setNPost] = useState("")
    const [iPost, setIPost] = useState("")
    const [nOrder, setNOrder] = useState("")
    const [iOrder, setIOrder] = useState("")

    const { mandal, role } = useSelector(state => state.auths)
    const { allBookData } = useSelector(state => state.bookLoads)
    const { bookAddStartStatus, bookAddErrorStatus, bookAddErrorMsg } = useSelector(state => state.bookAdds)

    // react hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // district array
    const districtArray = useDistrictList(mandal)[0]

    useState(() => {
        // useLoadBookData(dispatch, role, mandal)
        dispatch(bookAddSuccess())
    }, [])

    // submit data to server
    const submitData = async () => {

        // if not fill fields
        if (!district || district === "value" || !nPost || !iPost || !nOrder || !iOrder) {
            return dispatch(bookAddError("all fields are required!"))
        }


        // start dispatch
        dispatch(bookAddStart())

        // setting date
        const newDate = date || new Date()

        // check if already fill
        const todayData = useFilterByDateData(allBookData, newDate)
        const fillDitrict = useFilterByDistrict(todayData, district)
        if (fillDitrict[0]) return dispatch(bookAddError("already added!"))

        try {

            // data send to server
            const sendData = {
                district,
                npost: nPost,
                ipost: iPost,
                norder: nOrder,
                iorder: iOrder, date: newDate,
                mandal
            }

            // api call
            if (isProd) {
                await baseUrl.post("/bookorder", sendData)
            } else {

                addData("book", sendData)
                dispatch(bookAddSuccess())
                useLoadBookData(dispatch, role, mandal)
            }

            // dispatch success
            dispatch(bookAddSuccess())
            return navigate("/")

        } catch (err) {
            console.log(err.message)
        }


    }

    return (
        <Layout>
            <form>
                <Title>Add Book Order</Title>
                {
                    bookAddErrorStatus ? <Error>{bookAddErrorMsg}</Error> : null
                }
                <SelectBox value={district} onChange={e => setDistrict(e.target.value)} options={districtArray} >Select District</SelectBox>
                <InputBox id="date" value={date} onChange={e => setDate(e.target.value)} type="date">Enter Date</InputBox>
                <InputBox value={nPost} onChange={e => setNPost(e.target.value)} type="number">Enter National Post</InputBox>
                <InputBox value={iPost} onChange={e => setIPost(e.target.value)} type="number">Enter InterNational Post</InputBox>
                <InputBox value={nOrder} onChange={e => setNOrder(e.target.value)} type="number">Enter National Order</InputBox>
                <InputBox value={iOrder} onChange={e => setIOrder(e.target.value)} type="number">Enter InterNational Order</InputBox>
                <Button func={submitData}>
                    {
                        bookAddStartStatus ? "Submit 🏦..." : "Submit 🏦"
                    }
                </Button>
            </form>
        </Layout>
    )
}

export default BookOrderAdd