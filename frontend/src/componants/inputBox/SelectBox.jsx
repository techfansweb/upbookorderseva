import { useEffect } from "react"
import { useRef } from "react"
import "./inputBox.scss"

const SelectBox = ({ children, options, value, onChange, names }) => {

    return (
        <div className="inputBox">
            <select name={names} value={value} onChange={onChange}>
                <option defaultChecked value="value">{children}</option>
                {options[0] ? options.map((item) => <option key={item} value={item}>{item}</option>) : null}
            </select>
        </div>
    )
}

export default SelectBox