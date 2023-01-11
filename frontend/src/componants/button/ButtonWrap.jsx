import React from 'react'
import { useSelector } from 'react-redux'
import Button from './Button'

const ButtonWrap = ({ button1, button2, fun1, fun2, ref1, ref2, id }) => {

    const { role } = useSelector(state => state.auths)
    const style = {
        fontSize: "13px",
        backgroundColor: "white",
        color: "blueviolet",
        padidng: "5px"
    }

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {role == "admin" ? <Button
                style={style}
                buttonRef={ref1}
                func={fun1}
                id={id}
            >{button1}</Button> : null}
            <Button
                style={style}
                buttonRef={ref2}
                func={fun2}
            >{button2}</Button>
        </div>
    )
}

export default ButtonWrap