import './Result.css'
import ResultPagination from "../common/ResultPagination";
import React, {useState} from "react";
import ReportModal from "../modals/ReportModal";

const tableHeader = ['门诊号', '姓名', '性别', '年龄', '检测时间', '科室', '病例']

const Result = ({rows}) => {
    const [page, setPage] = useState(1)
    const [currentReport, setCurrentReport] = useState('')

    // Modal Dialog
    const [modalVisible, setModalVisible] = useState(false)
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    const handleViewReport = (link) => {
        setCurrentReport(link)
        showModal()
    }

    return (
        <div className={'Result'}>
            <div className={'ResultContent'}>
                <table style={{width: '100%', border: '1px solid #999', color: '#cecece'}}>
                    <thead style={{background: '#1f2120', lineHeight: "8rem"}}>
                    <tr>
                        {tableHeader.map((th, i) => {
                            return (<th key={i} style={{border: '1px solid #999'}}>{th}</th>)
                        })}
                    </tr>
                    </thead>
                    <tbody style={{fontSize: '1.6rem', background: '#505050'}}>
                    {rows.slice(11 * (page - 1), 11 * page).map((tr, i) => {
                        const validRows = [tr.patient_no, tr.name, tr.gender, tr.age, tr.created_at, tr.department]
                        return (
                            <tr key={i}>
                                {validRows.map((td, j) => {
                                    return (
                                        <td key={j} style={{border: '1px solid #999', lineHeight: "5rem"}}>{td}</td>
                                    )
                                })}
                                <td style={{borderBottom: '1px solid #999'}}><div onClick={() => handleViewReport(tr.report)} style={{color: '#418bfe', cursor: 'pointer'}}>浏览打印</div></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <div className={'ResultFooter'}>
                <ResultPagination page={page} setPage={setPage} pages={Math.ceil(rows.length / 11)}/>
            </div>

            {modalVisible && (<ReportModal show={showModal} hide={hideModal} report={currentReport} />)}
        </div>
    )
}

export default Result