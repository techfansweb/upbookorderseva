import useCapitalLatter from "../../hooks/useCapitalLatter"
import useNumber from "../../hooks/useNumber"
import "./imageReport.scss"
import dayjs from "dayjs"

const ImageReport = ({ id, sn, sr, data, count, isCount }) => {

    const forTitle = `${dayjs().format("DD-MM-YYYY")} (${dayjs().format("dddd")})`

    return (
        <div id={id} className="imageReport">
            {
                sn &&
                <div className="titleSection">
                    <div>Social Media Book Orders UP</div>
                    <div>{forTitle}</div>
                </div>
            }
            <div className="reportSection">
                <div className="titleTabRow tabRow">
                    <span>SN</span>
                    <span>{isCount ? "Mandal Name" : "District Name"}</span>
                    <span>N Order</span>
                    <span>I Order</span>
                    <span>Total</span>
                </div>
                {
                    data.map((item, i) => {
                        const conditionForClass = (i + 1) % 2 == 1 ? "class1" : "class2"
                        let obj = {}
                        obj.sr = useNumber(i + +sr, 10)
                        obj.name = useCapitalLatter(item.name)
                        obj.norder = useNumber(+item.norder, 10)
                        obj.iorder = useNumber(+item.iorder, 10)
                        obj.conditionForClass = conditionForClass
                        obj.total = useNumber(+item.iorder + +item.norder, 10)
                        return <DataRow key={i} data={obj} />
                    })
                }

                {
                    isCount &&
                    <div className="totalTabRow tabRow">
                        <span></span>
                        <span>Grand Total</span>
                        <span>{useNumber(+count.norder, 10)}</span>
                        <span>{useNumber(+count.iorder, 10)}</span>
                        <span>{useNumber(+count.iorder + +count.norder, 10)}</span>
                    </div>
                }
            </div>
        </div>
    )
}


const DataRow = ({ data }) => {

    return (
        <div className={`dataTabRow tabRow ${data.conditionForClass}`}>
            <span>{data.sr}</span>
            <span>{data.name}</span>
            <span>{data.norder}</span>
            <span>{data.iorder}</span>
            <span>{data.total}</span>
        </div>
    )
}
export default ImageReport