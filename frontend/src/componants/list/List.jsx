import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailBox } from '../../store/detailsBoxSlice'

const List = ({ data, children }) => {

    // react hooks
    const dispatch = useDispatch()

    // use selector
    const { detailBoxStatus, detailBoxId } = useSelector(state => state.detailsBoxs)

    // show box function
    const showDataBox = () => {
        dispatch(detailBox(data.id))
    }

    return (
        <div className="lists">
            <div className="list">

                {/* always open list */}
                <div className="listName">
                    <div className="sn">{data.sn}</div>
                    <div className="districtname">
                        <span>{data.fullname}</span>
                        <span>{data.subname}</span>
                    </div>
                    <div onClick={showDataBox} className="arrow">
                        {detailBoxStatus && detailBoxId == data.id ? ">" : "<"}
                    </div>
                </div>

                {/* open when click */}
                <div className={`listDetails ${detailBoxStatus && detailBoxId == data.id ? "active" : null}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default List