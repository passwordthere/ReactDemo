import './Result.css'
import ResultPagination from "../common/ResultPagination";
import {useState} from "react";

const tableHeader = ['门诊号', '姓名', '性别', '年龄', '检测时间', '科室', '病例']

const Result = ({rows}) => {
    const [page, setPage] = useState(1)

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
                    {rows.slice(page - 1, 11).map((tr, i) => {
                        const validRows = [tr.patient_no, tr.name, tr.gender, tr.age, tr.updated_at, tr.department]
                        return (
                            <tr key={i}>
                                {validRows.map((td, j) => {
                                    return (
                                        <td key={j} style={{border: '1px solid #999', lineHeight: "5rem"}}>{td}</td>
                                    )
                                })}
                                <td style={{borderBottom: '1px solid #999'}}><a style={{color: '#418bfe'}}>浏览打印</a></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <div className={'ResultFooter'}>
                <ResultPagination page={page} setPage={setPage} pages={Math.ceil(rows.length / 11)}/>
            </div>
        </div>
    )
}

export default Result