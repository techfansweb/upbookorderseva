import style from "./layout.scss"

const Layout = ({ children }) => {
  return (
    <div className="page">{children}</div>
  )
}

export default Layout