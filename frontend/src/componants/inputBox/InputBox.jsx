import { useState } from "react"
import "./inputBox.scss"

const InputBox = ({ style, style2, children, type, onChange, value, names, id }) => {

    const [focus, setFocus] = useState(false)

    const onFocus = () => {
        setFocus(true)
    }

    const focusRemove = () => {
        setFocus(false)
    }
    
    return (
        <div style={style2} className="inputBox">
            <input
                name={names}
                value={value}
                onFocus={onFocus}
                onBlurCapture={focusRemove}
                onChange={onChange}
                style={style}
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