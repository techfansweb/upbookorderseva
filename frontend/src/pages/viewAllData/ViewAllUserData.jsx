// react hooks
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"

// custom error
import useTitleTag from "../../hooks/useTitleTag"
import usePaginationIndex from "../../hooks/usePaginationIndex"
import useTotalPage from "../../hooks/useTotalPage"
import baseUrl from "../../hooks/useBaseUrl"
import useNumber from "../../hooks/useNumber"
import useCopy from "../../hooks/useCopy"
import useDelete from "../../hooks/useDelete"

// componant
import Pagination from "../../componants/pagination/Pagination"
import Layout from "../../componants/layout/Layout"
import List from "../../componants/list/List"
import Title from "../../componants/title/Title"
import Button from "../../componants/button/Button"
import ButtonWrap from "../../componants/button/ButtonWrap"
import NotFound from "../../componants/NotFound/NotFound"

// functions
import { userLoadError, userLoadStart, userLoadSuccess } from "../../store/userLoadSlice"
import { useLoadUserData, useRenderUserData } from "../../hooks/useUserData"
import { getData, removeData } from "../../hooks/useLocalStorage"
import { userDecress, userFilterStart, userFilterSuccess, userIncress } from "../../store/userFilterSlice"
import isProd from "../../isProd"
import Loading from "../../componants/loading/Loading"
import useCapitalLatter from "../../hooks/useCapitalLatter"
import { detailBox } from "../../store/detailsBoxSlice"

const ViewAllUserData = () => {

    // change title
    useTitleTag("User Data")

    // use selector
    const {
        allUserData, success, startAll, errorAll, errorMsgAll
    } = useSelector(state => state.userLoads)
    const { prevSuccess, nextSuccess } = useSelector(state => state.userFilters)
    const {
        allData, start, error, errorMsg, currentPage, totalPage
    } = useSelector(state => state.userFilters)
    const { userAddSuccessStatus } = useSelector(state => state.userAdds)

    // react hooks
    const dispatch = useDispatch()

    // prev page
    const prevPage = () => {
        if (currentPage == 1) return
        dispatch(userDecress())
    }

    // next page
    const nextPage = () => {
        dispatch(userIncress())
    }

    // useEffect call only 1 time
    useEffect(() => {

        if (!allUserData[0] || userAddSuccessStatus) {
            useLoadUserData(dispatch)
        } else {
            useRenderUserData(allUserData, dispatch, currentPage)
        }
    }, [userAddSuccessStatus, prevSuccess, nextSuccess])

    return (
        <Layout>
            <Title margin="0px">Sevadar Lists</Title>
            {
                !success ? <Loading /> :
                    !allUserData[0] ? <NotFound>No Sevadar Data 😶</NotFound> :
                        <div className='viewAllData'>
                            {
                                allData.map((item, i) => <List
                                    key={i}
                                    data={item}>
                                    <DetailsUser data={item} />
                                </List>)
                            }
                        </div>
            }

            {
                allUserData[0] && totalPage > 1 ?
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

const DetailsUser = ({ data }) => {

    // use selector
    const { allUserData } = useSelector(state => state.userLoads)
    const { currentPage } = useSelector(state => state.userFilters)

    // react hooks
    const dispatch = useDispatch()
    const copyRef = useRef(null)
    const removeRef = useRef(null)

    // copy data function
    const copyData = async () => {

        const text = `Sat Saheb Ji
Satguru Dev Ji Ki Jay
            
*🏷️ YOUR DETAIL FOR LOGIN*

Name : *${useCapitalLatter(data.fullname)}*
Mandal : *${useCapitalLatter(data.subname)}*
Number : *${data.number}*
Password : *${data.password}*
    
*❌ Do Not Share ❌*
`
        await useCopy(text, copyRef, "Copy")
    }

    // remove user from db
    const removeUser = async () => {

        // change title text
        removeRef.current.innerText = "Removing...👨‍🏭"

        try {

            // api call
            if (isProd) {
                await baseUrl.post("/user/delete", { id: removeRef.current.id })
            } else {
                removeData("user", removeRef.current.id)
            }

            // close details box
            dispatch(detailBox())

            // remove user from data
            const data = useDelete(allUserData, removeRef.current.id)

            // update data
            dispatch(userLoadSuccess(data))

            // render data
            useRenderUserData(data, dispatch, currentPage)
        } catch (err) {
            console.log(err.message)
        }

        // change title
        removeRef.current.innerText = "Remove"
    }

    return (
        <>
            < div>
                <span>Number</span>
                <span>{data.number}</span>
            </div>
            <div>
                <span>Password</span>
                <span>{data.password}</span>
            </div>
            <ButtonWrap
                button1="Remove"
                fun1={removeUser}
                ref1={removeRef}
                button2="Copy"
                ref2={copyRef}
                fun2={copyData}
                id={data.id}
            />
        </>
    )
}

export default ViewAllUserData