import { useRef } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Button from "../button/Button"

const Pagination = ({ prevPage, nextPage, totalPage, currentPage }) => {

    const style = {
        fontSize: "15px"
    }

    return (
        <div className="pagination">
            {totalPage >= 2 && currentPage !== 1 ? <Button style={style} func={prevPage}>Prev</Button> : null}
            {currentPage < totalPage ? <Button style={style} func={nextPage}>Next</Button> : null}
        </div>
    )
}

export default Pagination