import "./title.scss"

const Title = ({ children, margin }) => {
    return (
        <div style={{ margin }} className="title">{children}</div>
    )
}

export default Title