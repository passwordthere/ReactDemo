import './Report.css'
import React, {useEffect, useState} from "react";
import Spinner from 'react-bootstrap/Spinner';
import Links from "../../Links";
import Button from "react-bootstrap/Button";
import {ReportSaveAPI} from "../../api";
import {Message} from "../../utils/message";


const Report = ({report}) => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (report.every(r => r)) setReady(true)
    }, [report])

    const handleSave = () => {
        ReportSaveAPI().then(res => {
            if (res.code === 0) Message.success({message: '保存成功!'})
            else Message.warning({message: res.message})
        })
    }

    return (
        <div className='Report'>
            {ready ? (
                // <div className='ReportMain'>
                //     <iframe src={Links().media + report + '#view=FitV&toolbar=0'} title={'Report'} height={'100%'} width={'100%'}/>
                // </div>
                <div className='ReportMain'>
                    <div style={{width: '45%', height: '60vh',overflowY:'scroll', scrollbarWidth: 'none'}}>
                        <img src={Links().media + report[0]} style={{width: '100%'}}/>
                    </div>
                    <div style={{width: '45%', height: '60vh',overflowY:'scroll'}}>
                        <img src={Links().media + report[1]} style={{width: '100%'}}/>
                    </div>
                    <div style={{width: '10%', alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', gap: '20px', margin: '0 0 4rem 0'}}>
                        <Button onClick={handleSave} variant="outline-primary" style={{borderRadius: '4rem', fontSize: '1.8rem', padding: '0.5rem 0', margin: '0 1rem 0 1rem'}}>保存</Button>
                    </div>
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

