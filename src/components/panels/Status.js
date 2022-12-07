import './Status.css'
import StatusButton from "../common/StatusButton";
import React, {useState} from "react";
import {useEffect} from "react";
import RatingModal from "../modals/RatingModal";
import {ReportAPI} from "../../api";

const Status = ({currentStatus, finishedStatus, setCurrentStatus, setReport}) => {
    const handleLocating = () => {
        setCurrentStatus('locating')
    }
    const handleSurface = () => {
        setCurrentStatus('surface')
    }
    const handleProptosis = () => {
        setCurrentStatus('proptosis')
    }
    const handleWidth = () => {
        setCurrentStatus('width')
    }
    const handleRotation = () => {
        setCurrentStatus('rotation')
    }
    const handleRating = () => {
        setCurrentStatus('rating')
    }
    const handleReport = () => {
        setCurrentStatus('report')
        ReportAPI().then(res => {
            const pdf = res.data.pdf
            setReport(pdf)
        })
    }

    // Modal Dialog
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        if (currentStatus === 'rating') setModalVisible(true)
    }, [currentStatus])
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    return (
        <>
            <div className='Left'>
                <StatusButton text='自动定位' current={currentStatus === 'locating'} finished={finishedStatus.includes('locating')} handleClick={handleLocating}/>
                <StatusButton text='眼裂闭合' current={currentStatus === 'surface'} finished={finishedStatus.includes('surface')} handleClick={handleSurface}/>
                <StatusButton text='眼球突出度' current={currentStatus === 'proptosis'} finished={finishedStatus.includes('proptosis')} handleClick={handleProptosis}/>
                <StatusButton text='眼裂宽度 结膜充血' current={currentStatus === 'width'} finished={finishedStatus.includes('width')} handleClick={handleWidth}/>
                <StatusButton text='眼球活动度' current={currentStatus === 'rotation'} finished={finishedStatus.includes('rotation')} handleClick={handleRotation}/>
                <StatusButton text='评分' current={currentStatus === 'rating'} finished={finishedStatus.includes('rating')} handleClick={handleRating}/>
            </div>

            <div className='Right'>
                <StatusButton style={{}} round text='报告' current={currentStatus === 'report'} handleClick={handleReport}/>
            </div>

            {modalVisible && (<RatingModal show={showModal} hide={hideModal} handleReport={handleReport}/>)}
        </>
    )
}

export default Status