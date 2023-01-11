//react hooks
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

//custom hooks
import useTitleTag from "../../hooks/useTitleTag"
import useMandalList from "../../hooks/useMandalList"
import baseUrl from "../../hooks/useBaseUrl"

//componants
import InputBox from "../../componants/inputBox/InputBox"
import Title from "../../componants/title/Title"
import Button from "../../componants/button/Button"
import Layout from "../../componants/layout/Layout"
import SelectBox from "../../componants/inputBox/SelectBox"
import Error from "../../componants/Error/Error"

// functions
import { userAddError, userAddStart, userAddSuccess } from "../../store/userAddSlice"
import { addData } from "../../hooks/useLocalStorage"
import isProd from "../../isProd"


const UserAdd = () => {

  // chnage title
  useTitleTag("Add User")

  // use state
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [mandal, setMandal] = useState("")

  // use selector
  const { userAddErrorStatus, userAddErrorMsg, userAddStartStatus } = useSelector(state => state.userAdds)

  // other react rooks
  const dispatch = useDispatch()

  // mandal hooks
  const mandalArray = useMandalList()

  // submit data to server
  const submitData = async () => {

    // if not not fill all fields
    if (!mandal || mandal === "value" || !name || !number) {
      return dispatch(userAddError("all field are required!"))
    }

    // setting password
    const passwordString = Math.random().toFixed(15).toString().slice(3, 13)
    const mandalName = mandal.slice(0, 2).toUpperCase()
    const password = `UP.${mandalName}.${passwordString}`

    // dispatch for starting
    dispatch(userAddStart())

    try {

      // data send to server
      const sendData = {
        mandal, fullname: name, number, password
      }

      // call api
      if (isProd) {
        await baseUrl.post("/user", sendData)
      } else {
        addData("user", sendData)
      }

      // disptch success
      dispatch(userAddSuccess())

      // clear all fields
      setName("")
      setNumber("")
      setMandal("value")
    } catch (err) {
      console.log(err.message)
    }
  }


  return (
    <Layout>
      <form>
        <Title>Add Sevadar</Title>
        {
          userAddErrorStatus ? <Error>{userAddErrorMsg}</Error> : null
        }
        <InputBox value={name} onChange={e => setName(e.target.value)} type="text">Enter Name</InputBox>
        <InputBox value={number} onChange={e => setNumber(e.target.value)} type="number">Enter Number</InputBox>
        <SelectBox value={mandal} onChange={e => setMandal(e.target.value)} options={mandalArray} >Select Mandal</SelectBox>
        <Button func={submitData}>
          {
            userAddStartStatus ? "Submit 🏦..." : "Submit 🏦"
          }
        </Button>
      </form>
    </Layout>
  )
}

export default UserAdd