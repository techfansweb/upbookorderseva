import "./title.scss"

const Title2 = ({ children, color }) => {
    return (
        <div style={{ color }} className="title title2">{children}</div>
    )
}

export default Title2