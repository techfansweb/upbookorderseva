import { useDispatch, useSelector } from "react-redux"
import useCapitalLatter from "../../hooks/useCapitalLatter"
import useNumber from "../../hooks/useNumber"
import useSortData from "../../hooks/useSortData"
import { useTotalBooksMandal } from "../../hooks/useTotalBooks"
import "./imageReport.scss"
import html2canvas from "html2canvas"
import { useRef } from "react"
import dayjs from "dayjs"
import { imageDownloadSuccess } from "../../store/imageDownloadSlice"

const ImageReport = () => {

    const { todayData, todayCount } = useSelector(state => state.bookLoads)
    const { imageDownloadStartStatus } = useSelector(state => state.imageDownlaods)
    const dataToFormet = useTotalBooksMandal(todayData)
    const sortData = useSortData(dataToFormet)
    
    // react hooks
    const ref = useRef(null)
    const dispatch = useDispatch()


    const convertToImageDownload = async () => {

        // covert to canvas
        const canvas = await html2canvas(ref.current)

        // link genrate
        const link = canvas.toDataURL("jpg/jpeg", 1.0)

        // get date
        const date = dayjs().format("DD-MM-YYYY")
        // create anchor tag
        const a = document.createElement("a")
        a.href = link
        a.download = `bookOrderReportUp.${date}.jpg`
        a.click()
        dispatch(imageDownloadSuccess())
    }

    if(imageDownloadStartStatus) {
        convertToImageDownload()
    }
    
    const todayDate = dayjs().format("DD MMMM YYYY")
    const todayDay = dayjs().format("dddd")
    const forTitle = `${todayDate} (${todayDay})`

    return (
        <div ref={ref} className="imageReport">
            <div className="titleSection">
                <div>Social Media Book Orders UP</div>
                <div>{forTitle}</div>
            </div>
            <div className="reportSection">
                <div className="titleTabRow tabRow">
                    <span>SN</span>
                    <span>Mandal Name</span>
                    <span>N Order</span>
                    <span>I Order</span>
                    <span>Total</span>
                </div>
                {
                    sortData.map((item, i) => {
                        const conditionForClass = (i + 1) % 2 == 1 ? "class1" : "class2"
                        let obj = {}
                        obj.sr = useNumber(i + 1, 10)
                        obj.name = useCapitalLatter(item.name)
                        obj.norder = useNumber(+item.norder, 10)
                        obj.iorder = useNumber(+item.iorder, 10)
                        obj.conditionForClass = conditionForClass
                        obj.total = useNumber(+item.iorder + +item.norder, 10)
                        return <DataRow key={i} data={obj} />
                    })
                }

                <div className="totalTabRow tabRow">
                    <span></span>
                    <span>Grand Total</span>
                    <span>{useNumber(+todayCount.norder, 10)}</span>
                    <span>{useNumber(+todayCount.iorder, 10)}</span>
                    <span>{useNumber(+todayCount.iorder + +todayCount.norder, 10)}</span>
                </div>
            </div>
            <div className="info">
                <span>N = National</span>
                <span>I = InterNational</span>
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