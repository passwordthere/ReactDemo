import './Result.css'
import ResultPagination from "../common/ResultPagination";

const tableHeader = ['门诊号', '姓名', '性别', '年龄', '检测时间', '科室', '病例']
const tableBody = [['123', 'xc', '男', '18', '2022-12-12', '内分泌三科', '浏览打印'], ['123', 'xc', '男', '18', '2022-12-12', '内分泌三科', '浏览打印']]

const Result = () => {
    return (
        <div className={'Result'}>
            <div className={'ResultContent'}>
                <table style={{width: 'auto', height: '10rem', border: '1px solid #999', color: '#cecece', background: 'red'}} striped bordered hover>
                    <thead>
                    <tr>
                        {tableHeader.map((th, i) => {
                            return (<th style={{border: '1px solid #999'}}>{th}</th>)
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {tableBody.map((tr, i) => {
                        return (
                            <tr>
                                {tr.map((td, j) => {
                                    return (<td style={{border: '1px solid #999'}}>{td}</td>)
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <div className={'ResultFooter'}>
                <ResultPagination />
            </div>
        </div>
    )
}

export default Result