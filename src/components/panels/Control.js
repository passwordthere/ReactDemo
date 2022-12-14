import './Control.css'
import Button from "react-bootstrap/Button";
import {StepBackwardOutlined, StepForwardOutlined} from '@ant-design/icons';
import {Message} from "../../utils/message";
import {useEffect, useState} from "react";
import {statusList} from "../Home";

const Control = ({currentStatus, setCurrentStatus, eventTakingPhoto}) => {
    const [index, setIndex] = useState(0)

    useEffect(() => setIndex(statusList.indexOf(currentStatus)), [currentStatus])

    const handleNext = () => {
        if (index === 6) {
            Message.warning({message: '已经到底了'})
            return
        }
        setCurrentStatus(statusList[index + 1])
    }

    const handleLast = () => {
        if (index === 0) {
            return
        }
        setCurrentStatus(statusList[index - 1])
    }

    return (
        <div className='Control'>
            <div className='LeftControl'>
                <Button onClick={handleLast} style={{borderRadius: '3rem', padding: '5px 20px', fontSize: '2rem', display: 'flex', alignItems: 'center'}}><StepBackwardOutlined/>上一步</Button>
            </div>

            <div className='MidControl'>
                <Button onClick={eventTakingPhoto} className="rounded-circle" style={{padding: '40px', fontSize: '2.8rem'}}>拍摄</Button>
            </div>

            <div className='RightControl'>
                <Button onClick={handleNext} style={{borderRadius: '3rem', padding: '5px 20px', fontSize: '2rem', display: 'flex', alignItems: 'center'}}>下一步<StepForwardOutlined/></Button>
            </div>
        </div>
    )
}

export default Control