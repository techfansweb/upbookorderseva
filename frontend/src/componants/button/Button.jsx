import { useRef } from "react"
import "./button.scss"

const Button = ({ children, func, buttonRef, style, id }) => {


    const onClick = function (e) {
        e.preventDefault()

        func && func()
    }

    return (
        <button id={id} style={style} ref={buttonRef} onClick={onClick} className='button'>{children}</button>
    )
}

export default Button