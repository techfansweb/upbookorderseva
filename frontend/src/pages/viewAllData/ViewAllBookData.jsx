import "./viewAllData.scss"

// library
import dayjs from "dayjs"

// react hooks
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

// custom hooks
import useMandalList from "../../hooks/useMandalList"
import useTitleTag from "../../hooks/useTitleTag"
import useCopy from "../../hooks/useCopy"
import useDistrictList from "../../hooks/useDistrictList"
import MandalList from "../../mandalList"
import { useLoadBookData, useRenderBookData } from "../../hooks/useBookData"
import baseUrl from "../../hooks/useBaseUrl"
import useDelete from "../../hooks/useDelete"
import isProd from "../../isProd"
import useCapitalLatter from "../../hooks/useCapitalLatter"
import useNumber from "../../hooks/useNumber"

// componats
import Layout from "../../componants/layout/Layout"
import InputBox from "../../componants/inputBox/InputBox"
import SelectBox from "../../componants/inputBox/SelectBox"
import List from "../../componants/list/List"
import Pagination from "../../componants/pagination/Pagination"
import NotFound from "../../componants/NotFound/NotFound"
import Title from "../../componants/title/Title"
import Loading from "../../componants/loading/Loading"

// functions
import { bookLoadSuccess } from "../../store/bookLoadSlice"
import { bookDecress, bookIncress } from "../../store/bookFilterSlice"
import { removeData } from "../../hooks/useLocalStorage"
import { detailBox } from "../../store/detailsBoxSlice"
import ButtonWrap from "../../componants/button/ButtonWrap"
import useTodayData from "../../hooks/useTodayData"
import useTotalBooks from "../../hooks/useTotalBooks"

const ViewAllBookData = () => {

    // change title
    useTitleTag("Book Data")

    // use state
    const [mandalName, setMandalName] = useState("")
    const [districtName, setDistrictName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [districtArray, setDistrictArray] = useState([])

    // use selector
    const { mandal, role } = useSelector(state => state.auths)
    const { allBookData, bookLoadStartStatus } = useSelector(state => state.bookLoads)
    const { allBookFilterData, totalPage, currentPage, nextSuccessStatus, prevSuccessStatus } = useSelector(state => state.bookFilters)
    const { countAll } = useSelector(state => state.bookFilters)
    const { bookAddSuccessStatus } = useSelector(state => state.bookFilters)

    // react hooks
    const dispatch = useDispatch()
    const copyRef = useRef(null)
    const removeRef = useRef(null)

    // prev function
    const prevPage = () => {
        if (currentPage == 1) return
        dispatch(bookDecress())
    }

    // next function
    const nextPage = () => {
        dispatch(bookIncress())
    }

    // mandal & district list
    const mandalArray = useMandalList()
    const districtArrays = useDistrictList(mandal)[0]

    // onchange function
    const onChangeFunc = (e) => {

        // value & name
        const value = e.target.value
        const name = e.target.name

        // data send to server for filter
        const data = {
            mandal: mandalName,
            district: districtName,
            startDate,
            endDate,
            page: currentPage
        }

        // change current value
        data[name] = value

        if (name == "mandal") {
            setMandalName(value)
            setDistrictName("")
            filterData(startDate, endDate, value, "value")
            data.district = ""
        } else if (name == "district") {
            setDistrictName(value)
            filterData(startDate, endDate, mandalName, value)
            if (value == "value") {
                data.district = ""
            }
        } else if (name == "startDate") {
            setStartDate(value)
            filterData(value, endDate, mandalName, districtName)
        } else if (name == "endDate") {
            setEndDate(value)
            filterData(startDate, value, mandalName, districtName)
        }

        // if district no select
        if (districtName == "value") {
            data.district = ""
        }

        // update district
        MandalList.map(item => {

            if (value == "value") {
                return setDistrictArray([])
            }

            if (!item[value]) return
            setDistrictArray(item[value])
        })
    }


    const filterData = (startdate, enddate, mandalname, districtname) => {

        // if date and mandal not change
        if (!startdate || !enddate) {
            return useRenderBookData(allBookData, dispatch, currentPage)
        }

        let data
        // date convert to now
        const sDate = dayjs(startdate).startOf("date").valueOf()
        const eDate = dayjs(enddate).startOf("date").valueOf()

        if (eDate < sDate) {
            return useRenderBookData(allBookData, dispatch, currentPage)
        }

        // filter by dates
        data = allBookData.filter(item => {

            // convert book order date in value 
            const date = dayjs(item.date).startOf("date").valueOf()
            return sDate <= date && eDate >= date
        })

        // if no data
        if (!data[0]) {
            return useRenderBookData(data, dispatch, currentPage)
        }

        if (role == "admin") {
            // if date and mandal not change
            if (!mandalname || mandalname == "value") {
                return useRenderBookData(data, dispatch, currentPage)
            }
        }

        if (role == "admin") {
            // filter by mandal
            data = data.filter(item => {
                return item.mandal == mandalname
            })
        }


        if (districtname == "value") {
            return useRenderBookData(data, dispatch, currentPage)
        }

        // if no data
        if (!data[0]) {
            return useRenderBookData(data, dispatch, currentPage)
        }

        if (districtname) {
            data = data.filter(item => {
                return item.district == districtname
            })
        }

        useRenderBookData(data, dispatch, currentPage)
    }

    // run on depends
    useEffect(() => {

        if (!allBookData[0] || bookAddSuccessStatus) {
            useLoadBookData(dispatch, role, mandal)
        } else {
            useRenderBookData(allBookData, dispatch, currentPage)
        }
    }, [nextSuccessStatus, prevSuccessStatus, bookAddSuccessStatus])

    return (
        <Layout>
            <Title margin="0px">Book Order Lists</Title>

            {
                // when book loading start time
                bookLoadStartStatus ? <Loading /> :

                    // if no any book data
                    !allBookData[0] ?
                        <NotFound>No Book Data 😶</NotFound> :

                        // show data
                        <div className="viewAllData">
                            <div className="select">
                                <div className="dates">
                                    <InputBox id="sdate" names="startDate" value={startDate} onChange={onChangeFunc} type="date">Select Start Date</InputBox>
                                    <InputBox id="edate" names="endDate" value={endDate} onChange={onChangeFunc} type="date">Select End Date</InputBox>
                                </div>
                                <div className="location">
                                    {
                                        role == "admin" ?
                                            <SelectBox
                                                names="mandal"
                                                value={mandalName}
                                                onChange={onChangeFunc}
                                                options={mandalArray}
                                            >Select Mandal</SelectBox> : null
                                    }
                                    {
                                        role == "user" ?
                                            <SelectBox
                                                names="district"
                                                value={districtName}
                                                onChange={onChangeFunc}
                                                options={districtArrays}
                                            >Select District</SelectBox> :
                                            <SelectBox
                                                names="district"
                                                value={districtName}
                                                onChange={onChangeFunc}
                                                options={districtArray}
                                            >Select District</SelectBox>
                                    }
                                </div>
                            </div>

                            <div className="totals">
                                <div className="posts">
                                    <div className="npost">
                                        <span>Total National Post</span>
                                        <span>{countAll.npost}</span>
                                    </div>
                                    <div className="ipost">
                                        <span>Total International Post</span>
                                        <span>{countAll.ipost}</span>
                                    </div>
                                </div>
                                <div className="orders">
                                    <div className="norder">
                                        <span>Total National Order</span>
                                        <span>{countAll.norder}</span>
                                    </div>
                                    <div className="iorder">
                                        <span>Total International Order</span>
                                        <span>{countAll.iorder}</span>
                                    </div>
                                </div>
                            </div>
                            {
                                !allBookFilterData[0] ? <NotFound>No Data Found 😕</NotFound> :
                                    allBookFilterData.map((item, i) => <List
                                        key={i}
                                        data={item}>
                                        <DetailsBook data={item} />
                                    </List>)
                            }
                        </div>
            }
            {
                totalPage > 1 ?
                    <Pagination
                        totalPage={totalPage}
                        currentPage={currentPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                    /> : null
            }
        </Layout>
    )
}



const DetailsBook = ({ data }) => {

    // use selector
    const { allBookData } = useSelector(state => state.bookLoads)
    const { currentPage } = useSelector(state => state.bookFilters)

    // react hooks
    const dispatch = useDispatch()
    const copyRef = useRef(null)
    const removeRef = useRef(null)

    // copy function
    const copyData = async () => {

        const date = dayjs(data.subname).format("DD-MMM-YYYY")
        const text = `Sat Saheb Ji
Satguru Dev Ji Ki Jay
            
🔸Date : *${date}*
🔸District : *${useCapitalLatter(data.fullname)}*
    
🧾 National Post : *${useNumber(data.npost, 10)}*
🧾 InterNational Post : *${useNumber(data.ipost, 10)}*
🧾 National Order : *${useNumber(data.norder, 10)}*
🧾 InterNational Order : *${useNumber(data.iorder, 10)}*
    
*❌ Do Not Copy Paste ❌*
`
        await useCopy(text, copyRef, "Copy")
    }

    // remove book
    const removeBook = async (func) => {

        removeRef.current.innerText = "Removing...👨‍🏭"

        try {

            // api call
            if (isProd) {
                await baseUrl.post("/bookorder/delete", { id: removeRef.current.id })
            } else {
                removeData("book", removeRef.current.id)
            }

            // close details box
            dispatch(detailBox())

            // remove delete data from data
            const data = useDelete(allBookData, removeRef.current.id)
            const reTodayData = useTodayData(data)
            const reTodayCount = useTotalBooks(reTodayData)

            // upadate data
            dispatch(bookLoadSuccess([data, reTodayData, reTodayCount]))

            // render data
            useRenderBookData(data, dispatch, currentPage)
        } catch (err) {
            console.log(err.message)
        }

        removeRef.current.innerText = "Remove"
    }

    return (
        <>
            < div>
                <span>National Post</span>
                <span>{data.npost}</span>
            </div>
            <div>
                <span>National Order</span>
                <span>{data.norder}</span>
            </div>
            <div>
                <span>InterNational Post</span>
                <span>{data.ipost}</span>
            </div>
            <div>
                <span>InterNational Order</span>
                <span>{data.iorder}</span>
            </div>
            <ButtonWrap
                button1="Remove"
                fun1={removeBook}
                ref1={removeRef}
                button2="Copy"
                ref2={copyRef}
                fun2={copyData}
                id={data.id}
            />
        </>
    )
}
export default ViewAllBookData