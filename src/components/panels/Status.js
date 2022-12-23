import './Status.css'
import StatusButton from "../common/StatusButton";
import React, {useEffect, useState} from "react";
import RatingModal from "../modals/RatingModal";
import {statusList} from "../Home";

const Status = ({currentStatus, setCurrentStatus, result, setResult, finishedStatus, setReport}) => {

    const handleLocating = () => {
        setCurrentStatus(statusList[0])
    }
    const handleSurface = () => {
        setCurrentStatus(statusList[1])
    }
    const handleProptosis = () => {
        setCurrentStatus(statusList[2])
    }
    const handleWidth = () => {
        setCurrentStatus(statusList[3])
    }
    const handleRotation = () => {
        setCurrentStatus(statusList[4])
    }
    const handleRating = () => {
        setCurrentStatus(statusList[5])
    }
    const handleReport = () => {
        setCurrentStatus(statusList[6])
    }

    // Modal Dialog
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {if (currentStatus === statusList[5]) showModal()}, [currentStatus])
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    return (
        <>
            <div className='Left'>
                <StatusButton text='自动定位' current={currentStatus === statusList[0]} finished={finishedStatus.includes(statusList[0])} handleClick={handleLocating}/>
                <StatusButton text='眼裂闭合' current={currentStatus === statusList[1]} finished={finishedStatus.includes(statusList[1])} handleClick={handleSurface}/>
                <StatusButton text='眼球突出度' current={currentStatus === statusList[2]} finished={finishedStatus.includes(statusList[2])} handleClick={handleProptosis}/>
                <StatusButton text='眼裂宽度 结膜充血' current={currentStatus === statusList[3]} finished={finishedStatus.includes(statusList[3])} handleClick={handleWidth}/>
                <StatusButton text='眼球活动度' current={currentStatus === statusList[4]} finished={finishedStatus.includes(statusList[4])} handleClick={handleRotation}/>
                <StatusButton text='评分' current={currentStatus === statusList[5]} finished={finishedStatus.includes(statusList[5])} handleClick={handleRating}/>
            </div>

            <div className='Right'>
                <StatusButton round text='报告' current={currentStatus === statusList[6]} handleClick={handleReport}/>
            </div>

            {modalVisible && (<RatingModal show={showModal} hide={hideModal} result={result} setResult={setResult} handleReport={handleReport} setReport={setReport}/>)}
        </>
    )
}

export default Status