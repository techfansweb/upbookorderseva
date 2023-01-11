// raect hooks
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import baseUrl from "./hooks/useBaseUrl"

// custom hooks
import isProd from "./isProd"

// componants
import BookOrderAdd from "./pages/bookOrderAdd/BookOrderAdd"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import UserAdd from "./pages/userAdd/UserAdd"
import ViewAllBookData from "./pages/viewAllData/ViewAllBookData"
import ViewAllUserData from "./pages/viewAllData/ViewAllUserData"
import NotFound from "./componants/NotFound/NotFound"

// functions
import { authError, authStart, authSuccess } from "./store/authSlice"
import { addData } from "./hooks/useLocalStorage"
import Loading from "./componants/loading/Loading"
import { bookLoadSuccess } from "./store/bookLoadSlice"
import { useLoadBookData } from "./hooks/useBookData"


function App() {

  // react hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // use Selector
  const { startStatus } = useSelector(state => state.auths)
  const { mandal, role } = useSelector(state => state.auths)

  useEffect(() => {

    const addSevadar = () => {

      if (!localStorage.getItem("user")) {
        addData("user", {
          fullname: "Admin",
          mandal: "lucknow",
          number: "9898989898"
        }, "admin", "password")
      }
    }

    if (!isProd) {
      addSevadar()
    }

    // authencation
    const authencateUser = async () => {

      // dispatch start
      dispatch(authStart())

      // get data from ls
      const userFromLs = localStorage.getItem("auth")

      // if no user on ls
      if (!userFromLs) return dispatch(authError())

      // api call comparing..
      let user = JSON.parse(userFromLs)
      let userVerify
      if (isProd) {
        const { data } = await baseUrl.post("user/single")

        // if no user not valid
        if (!data) return navigate("/login")
      }

      // success 
      return dispatch(authSuccess(user))
    }

    // call function
    authencateUser()
    useLoadBookData(dispatch, role, mandal)
  }, [])


  return (
    <>
      {
        startStatus ? <Loading /> :
          <Routes>
            <Route path="/" element={<AuthRoutes><Home /></AuthRoutes>} />
            <Route path="/addbookorder" element={<AuthRoutes><BookOrderAdd /></AuthRoutes>} />
            <Route path="/adduser" element={<AuthRoutes><UserAdd /></AuthRoutes>} />
            <Route path="/viewbookdata" element={<AuthRoutes><ViewAllBookData /></AuthRoutes>} />
            <Route path="/viewuserdata" element={<AuthRoutes><ViewAllUserData /></AuthRoutes>} />
            <Route path="/login" element={<GuestRoutes><Login /></GuestRoutes>} />
          </Routes>
      }
    </>
  )
}

const AuthRoutes = ({ children }) => {

  const { auth } = useSelector(state => state.auths)

  if (!auth) return <Navigate to="/login" />
  return children
}


const GuestRoutes = ({ children }) => {

  const { auth } = useSelector(state => state.auths)

  if (auth) return <Navigate to="/" />
  return children
}

export default App
