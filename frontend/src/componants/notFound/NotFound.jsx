import "./notfound.scss"

const NotFound = ({ children }) => {

    return (
        <div className='notFound'>
            {children ? children : "Data Not Found"}
        </div>
    )
}

export default NotFound