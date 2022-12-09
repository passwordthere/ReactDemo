import './Report.css'
import React, {useEffect, useState} from "react";
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
                    <iframe src={Links().media + report + '#view=FitV&toolbar=0'} title={'Report'} height={'100%'} width={'100%'}/>
                </div>
            ) : (
                <div className='ReportLoading'>
                    <Spinner animation="border" style={{padding: '2rem'}}/>
                    <div>生成中</div>
                </div>
            )}
        </div>
    )
}

export default Report


// <div className='ReportMain'>
//     <div style={{width: '45%', height: '64vh',overflowY:'scroll', scrollbarWidth: 'none'}}>
//         <img src={Links().media + 'report_1.png'} style={{width: '100%'}}/>
//     </div>
//     <div style={{width: '45%', height: '64vh',overflowY:'scroll'}}>
//         <img src={Links().media + 'report_2.png'} style={{width: '100%'}}/>
//     </div>
//     <div style={{width: '10%', alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', gap: '20px'}}>
//         <Button variant="outline-primary" style={{borderRadius: '4rem', padding:'1rem 4rem', fontSize: '1.8rem'}}>保存</Button>
//         <Button variant="outline-secondary" style={{borderRadius: '4rem', padding:'1rem 4rem', fontSize: '1.8rem'}}>不保存</Button>
//     </div>
// </div>