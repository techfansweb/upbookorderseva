import { useState } from "react"
import "./inputBox.scss"

const InputBox = ({ children, type, onChange, value, names, id }) => {

    const [focus, setFocus] = useState(false)

    const onFocus = () => {
        setFocus(true)
    }

    const focusRemove = () => {
        setFocus(false)
    }

    return (
        <div className="inputBox">
            <input
                name={names}
                value={value}
                onFocus={onFocus}
                onBlurCapture={focusRemove}
                onChange={onChange}
                placeholder={children}
                type={type}
                id={id}
            />
            {
                type == "date" && !focus && !value ? <label htmlFor={id}>{children}</label> : null
            }
        </div>
    )
}

export default InputBox