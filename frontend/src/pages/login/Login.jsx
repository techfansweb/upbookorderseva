import InputBox from "../../componants/inputBox/InputBox"
import Title from "../../componants/title/Title"
import Button from "../../componants/button/Button"
import Layout from "../../componants/layout/Layout"
import { useNavigate } from "react-router-dom"
import { loginError, loginStart, loginSuccess } from "../../store/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Error from "../../componants/Error/Error"
import { useState } from "react"
import baseUrl from "../../hooks/useBaseUrl"
import useTitleTag from "../../hooks/useTitleTag"
import isProd from "../../isProd"
import { getData } from "../../hooks/useLocalStorage"


const Login = () => {

    useTitleTag("Login")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, errorMsg, start } = useSelector(state => state.auths)

    const submitData = async () => {

        if (!number || !password) {
            return dispatch(loginError("all field are required!"))
        }

        dispatch(loginStart())

        try {
            const sendData = { number, password }

            // call api
            let reciveData
            if (isProd) {
                const { data } = await baseUrl.get("user")
                reciveData = data
            } else {
                reciveData = getData("user")
            }

            let numCheck = false
            reciveData.map(item => {
                if (item.number.toString() == number.toString()) {
                    numCheck = true
                }
            })

            if (!numCheck) {
                return dispatch(loginError("number is wrong!"))
            }

            let passCheck = false
            let user
            let id
            reciveData.map(item => {

                if (item.password.toString() == password.toString()) {
                    passCheck = true
                    user = {
                        auth: true,
                        role: item.role,
                        mandal: item.mandal,
                        id: item._id
                    }
                    id = item._id
                }
            })

            if (!passCheck) {
                return dispatch(loginError("password is wrong!"))
            }

            localStorage.setItem("auth", JSON.stringify(user))
            return dispatch(loginSuccess(user))

        } catch (err) {
            err.message && dispatch(loginError(err.message))
        }
    }

    return (
        <Layout>
            <form>
                <Title>Login Page</Title>
                {
                    error ? <Error>{errorMsg}</Error> : null
                }
                <InputBox value={number} onChange={e => setNumber(e.target.value)} type="number">Enter Your Number</InputBox>
                <InputBox value={password} onChange={e => setPassword(e.target.value)} type="password">Enter Your Password</InputBox>
                <Button func={submitData}>
                    {
                        start ? "Login 😎..." : "Login 😎"
                    }
                </Button>
            </form>
        </Layout>
    )
}

export default Login