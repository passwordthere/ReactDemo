import './Report.css'
import {useEffect, useState} from "react";
import Spinner from 'react-bootstrap/Spinner';
import Links from "../../Links";


const Report = ({report}) => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (report !== null) setReady(true)
    }, [report])

    return (
        <div className='Report'>
            {ready ? (
                <div className='ReportMain'>
                    {/*<Image src={Links().media + 'report_1.png'} style={{ display: "block", width: '600px'}}/>*/}
                    {/*<Image src={Links().media + 'report_2.png'} style={{ display: "block", width: '600px'}}/>*/}
                    <iframe src={Links().media + report + '#view=FitV'} height={'100%'} width={'100%'}/>
                    {/*<button>保存</button>*/}
                </div>
            ) : (
                <div className='ReportLoading'>
                    <Spinner animation="border"/>
                    <div>生成中...</div>
                </div>
            )}
        </div>
    )
}

export default Report