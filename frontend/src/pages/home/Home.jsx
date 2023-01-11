import "./home.scss"

// react hooks
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

// custom hooks
import useCopy from "../../hooks/useCopy"
import useDistrictList, { useAllDistrict } from "../../hooks/useDistrictList"
import useMandalList from "../../hooks/useMandalList"
import useNumber from "../../hooks/useNumber"
import useSortData from "../../hooks/useSortData"
import useSatusList from "../../hooks/useStatusList"
import MandalList, { districtList } from "../../mandalList"
import { useLoadBookData, useRenderBookData } from "../../hooks/useBookData"
import useTodayData from "../../hooks/useTodayData"
import useTotalBooks, { useTotalBooksMandal } from "../../hooks/useTotalBooks"
import useFilterByMandal from "../../hooks/useFilterByMandal"

// componants
import Button from "../../componants/button/Button"
import Layout from "../../componants/layout/Layout"
import Title from "../../componants/title/Title"
import Title2 from "../../componants/title/Title2"

// functions
import { fillStatusAction } from "../../store/bookSlice"
import { logoutStart } from "../../store/authSlice"
import dayjs from "dayjs"
import { bookFilterRemove } from "../../store/bookFilterSlice"
import { bookLoadRemove } from "../../store/bookLoadSlice"
import NotFound from "../../componants/NotFound/NotFound"


const Home = () => {

    // use selector
    const { fullname, number, role, mandal } = useSelector(state => state.auths)
    const { allBookData, todayData, todayCount, bookLoadSuccessStatus } = useSelector(state => state.bookLoads)
    const { bookAddSuccessStatus } = useSelector(state => state.bookAdds)

    // react hook
    const copyRef1 = useRef(null)
    const copyRef2 = useRef(null)
    const copyRef3 = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // custom hooks
    const mandalsArray = useMandalList()
    const districtArray = useDistrictList(mandal)

    const fillMandalData = useFilterByMandal(todayData, mandal)

    // status list
    const statusListMandal = useSatusList(districtArray, fillMandalData, "mandal")
    const statusListState = useSatusList("", "", "state", todayData)

    useEffect(() => {

        // load data when page loaded
        if (!allBookData[0] || bookAddSuccessStatus) {
            useLoadBookData(dispatch, role, mandal, false)
        }
    }, [bookAddSuccessStatus])

    // for report
    const date = dayjs().format("DD-MMM-YYYY")
    const reportOf = role == "admin" ? "State" : "Mandal"
    const capMandalName = mandal.slice(0, 1).toLocaleUpperCase() + mandal.slice(1)
    const reportOfLoaction = role == "admin" ? "Uttar Pradesh" : capMandalName

    const reportFormet = (data) => {

        const arr = data.map((item, i) => {

            const sn = useNumber(i + 1, 10)
            const norder = useNumber(item.norder, 100)
            const iorder = useNumber(item.iorder, 100)
            const name = item.name.slice(0, 1).toUpperCase() + item.name.slice(1)
            const text = `${sn}. | *${norder}* - *${iorder}* | ${name}\n`
            return text
        })
        return arr
    }

    const copyReport1 = async () => {

        const text = `Sat Saheb Ji
Satguru Dev Ji Ki Jay

🔸Date : *${date}*
🔸${reportOf} : *${reportOfLoaction}*

🧾 National Post : *${useNumber(todayCount.npost, 10)}*
🧾 InterNational Post : *${useNumber(todayCount.ipost, 10)}*
🧾 National Order : *${useNumber(todayCount.norder, 10)}*
🧾 InterNational Order : *${useNumber(todayCount.iorder, 10)}*

...............................
🧾 Total Post : *${useNumber(todayCount.npost + todayCount.ipost, 100)}*
🧾 Total Order : *${useNumber(todayCount.norder + todayCount.iorder, 100)}*
...............................

*❌ Do Not Copy Paste ❌*
`

        await useCopy(text, copyRef1, "Copy 1")
    }

    const copyReport2 = async () => {

        const dataToFormet = role == "admin" ? useTotalBooksMandal(todayData) : useTotalBooksMandal(todayData, mandal)
        const sortData = useSortData(dataToFormet)
        const data = reportFormet(sortData).toString().replace(/,/g, "")

        const text = `Sat Saheb Ji
Satguru Dev Ji Ki Jay
        
🔸Date : *${date}*
🔸${reportOf} : *${reportOfLoaction}*

${data}
..............................
🧾 National Order : *${useNumber(todayCount.norder, 10)}*
🧾 InterNational Order : *${useNumber(todayCount.iorder, 10)}*
..............................

*❌ Do Not Copy Paste ❌*
`

        await useCopy(text, copyRef2, "Copy 2")
    }

    const copyReport3 = async () => {

        const dataToFormet = useTotalBooksMandal(todayData, mandal, true)
        const sortData = useSortData(dataToFormet)
        const data = reportFormet(sortData).toString().replace(/,/g, "")

        const text = `Sat Saheb Ji
Satguru Dev Ji Ki Jay
        
🔸Date : *${date}*
🔸${reportOf} : *${reportOfLoaction}*

${data}
..............................
🧾 National Order : *${useNumber(todayCount.norder, 10)}*
🧾 InterNational Order : *${useNumber(todayCount.iorder, 10)}*
..............................

*❌ Do Not Copy Paste ❌*
`

        await useCopy(text, copyRef3, "Copy 3")
    }

    const viewBookData = () => {
        navigate("/viewbookdata")
    }

    const viewUserData = () => {
        navigate("/viewuserdata")
    }

    const goToForm = () => {
        if (role === "admin") {
            return navigate("/adduser")
        }
        return navigate("/addbookorder")
    }

    const logout = () => {

        localStorage.removeItem("auth")
        dispatch(bookLoadRemove())
        dispatch(logoutStart())
    }

    return (
        <Layout>
            <div className="home">
                <div className="totalData">
                    <Box1
                        title="📄 Posts"
                        title1="National"
                        title2="InterNatinal"
                        value1={
                            bookLoadSuccessStatus ? todayCount.npost : 0
                        }
                        value2={
                            bookLoadSuccessStatus ? todayCount.ipost : 0
                        }
                        bg="orange"
                    />
                    <Box1
                        title="📚 Orders"
                        title1="National"
                        title2="InterNatinal"
                        value1={
                            bookLoadSuccessStatus ? todayCount.norder : 0
                        }
                        value2={
                            bookLoadSuccessStatus ? todayCount.iorder : 0
                        }
                        bg="blueviolet"
                    />
                </div>


                <Box2 onClick={goToForm}>
                    <div className="fillFormIcon">+</div>
                </Box2>


                <Box>
                    <Title2>👨‍💼 Status</Title2>
                    {
                        role == "user" ?
                            statusListMandal.map((item, i) => <StatusListBox key={i} sn={i + 1} data={item} />) :
                            statusListState.map((item, i) => <StatusListBox key={i} sn={i + 1} data={item} />)
                    }
                </Box>

                {
                    role == "user" && districtArray[0].length == fillMandalData.length || role == "admin" ?
                        <Box>
                            <Title2>📑 Reports</Title2>
                            <ReportBox>
                                <Button buttonRef={copyRef1} func={copyReport1} >Copy 1</Button>
                            </ReportBox>
                            <ReportBox>
                                <Button buttonRef={copyRef2} func={copyReport2} >Copy 2</Button>
                            </ReportBox>
                            {
                                role == "admin" ?
                                    <ReportBox>
                                        <Button buttonRef={copyRef3} func={copyReport3} >Copy 3</Button>
                                    </ReportBox> : null
                            }
                        </Box> : null
                }

                <Box>
                    <Button func={viewBookData}>View All Book Data</Button>
                    {
                        role == "admin" ? <Button func={viewUserData}>View All User Data</Button> : null
                    }
                    <Button func={logout}>Logout</Button>
                </Box>
            </div>
        </Layout>
    )
}

const Box = ({ children }) => {

    return (
        <div className="box">{children}</div>
    )
}

const Box2 = ({ children, onClick }) => {

    return (
        <div onClick={onClick} className="box2">{children}</div>
    )
}

const ReportBox = ({ children }) => {

    return (
        <div className="reportBox">{children}</div>
    )
}

const StatusListBox = ({ children, data, sn }) => {

    return (
        <div className="statusListBox">
            <span>{sn}</span>
            <span>{data.district}</span>
            <span>{data.status}</span>
        </div>
    )
}

const Box1 = ({ title, title1, title2, value1, value2, bg }) => {

    return (
        <div style={{ backgroundColor: bg }} className="posts">
            <Title2 color="White">{title}</Title2>
            <ReportBox>
                <Box4 title={title1} value={value1} />
                <Box4 title={title2} value={value2} />
            </ReportBox>
        </div >
    )
}

const Box4 = ({ title, value }) => {

    return (
        <div className="box4">
            <span style={{ fontSize: "13px" }}>{title}</span>
            <span style={{ fontSize: "30px" }}>{value}</span>
        </div>
    )
}
export default Home