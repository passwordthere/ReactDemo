import './ControlLocate.css'
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined} from '@ant-design/icons';
import {LocateAdjustAPI, LocateConfirmAPI} from "../../api";
import {useEffect, useState} from "react";
import {Message} from "../../utils/message";


const ControlLocate = ({eventTakingPhoto, hasLocated}) => {
    const buttonStyle = {
        borderRadius: '1.2rem',
        width: '37%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
    const inputStyle = {
        background: '#31363a',
        border: '1px solid rgb(70, 140, 250)',
        borderRadius: '1.4rem',
        color: '#cecece',
        width: '80%',
        // fontSize: '1.6rem'
    }

    const [posEye, setPosEye] = useState('0')
    const [posJaw, setPosJaw] = useState('0')
    const [posForehead, setPosForehead] = useState('0')

    const on_mouse_down = (action) => {
        if (action === 'eyes_in') {
            LocateAdjustAPI({action: 'od_in'})
            LocateAdjustAPI({action: 'os_in'})
        } else if (action === 'eyes_out') {
            LocateAdjustAPI({action: 'od_out'})
            LocateAdjustAPI({action: 'os_out'})
        } else LocateAdjustAPI({action: action})
    }
    const on_mouse_up = (action) => {
        if (action === 'eyes_stop') {
            LocateAdjustAPI({action: 'od_stop'}).then(res => setPosEye(res.data.pos))
            LocateAdjustAPI({action: 'os_stop'})
        } else if (action === 'jaw_stop') {
            LocateAdjustAPI({action: action}).then(res => setPosJaw(res.data.pos))
        } else if (action === 'forehead_stop') {
            LocateAdjustAPI({action: action}).then(res => setPosForehead(res.data.pos))
        }
    }

    const handleConfirm = () => {
        LocateConfirmAPI().then(res => {
            setPosEye(res.data.pos[0])
            setPosJaw(res.data.pos[1])
            setPosForehead(res.data.pos[2])
            Message.success({message: '确认成功!'})
        })
    }

    // useEffect(() => {
    //     LocateAdjustAPI({action: 'od_stop'}).then(res => setPosEye(res.data.pos))
    //     LocateAdjustAPI({action: 'jaw_stop'}).then(res => setPosJaw(res.data.pos))
    //     LocateAdjustAPI({action: 'forehead_stop'}).then(res => setPosForehead(res.data.pos))
    // }, [posEye, posJaw, posForehead])

    return (
        <div className='ControlLocate'>
            <div className='LeftControlLocate'>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>颌拖（mm）</div>
                    <div><Form.Control style={inputStyle} className='outline-primary' type="textarea" placeholder={posJaw}/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onMouseDown={() => on_mouse_down('jaw_in')} onMouseUp={() => on_mouse_up('jaw_stop')} style={buttonStyle}><CaretUpOutlined/>内移</Button>
                        <Button onMouseDown={() => on_mouse_down('jaw_out')} onMouseUp={() => on_mouse_up('jaw_stop')} style={buttonStyle}><CaretDownOutlined/>外移</Button>
                    </div>
                </div>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>额拖（mm）</div>
                    <div><Form.Control style={inputStyle} className='outline-primary' type="textarea" placeholder={posForehead}/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onMouseDown={() => on_mouse_down('forehead_in')} onMouseUp={() => on_mouse_up('forehead_stop')} style={buttonStyle}><CaretUpOutlined/>内移</Button>
                        <Button onMouseDown={() => on_mouse_down('forehead_out')} onMouseUp={() => on_mouse_up('forehead_stop')} style={buttonStyle}><CaretDownOutlined/>外移</Button>
                    </div>
                </div>
            </div>
            <div className='MidControlLocate'>
                {hasLocated ? <Button onClick={handleConfirm} className="rounded-circle" style={{padding: '40px', fontSize: '2.8rem'}}>确认</Button> : <Button onClick={eventTakingPhoto} className="rounded-circle" style={{padding: '40px', fontSize: '2.8rem'}}>拍摄</Button>}
            </div>
            <div className='RightControlLocate'>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>眶距（mm）</div>
                    <div><Form.Control style={inputStyle} className='outline-primary' type="textarea" placeholder={posEye}/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onMouseDown={() => on_mouse_down('eyes_in')} onMouseUp={() => on_mouse_up('eyes_stop')} style={buttonStyle}><CaretLeftOutlined/>内移</Button>
                        <Button onMouseDown={() => on_mouse_down('eyes_out')} onMouseUp={() => on_mouse_up('eyes_stop')} style={buttonStyle}><CaretRightOutlined/>外移</Button>
                    </div>
                </div>
                <div style={{width: '30%', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>眼角压力值</div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button style={{borderRadius: '1.2rem', width: '80%'}}>1111</Button>
                        <div>OD</div>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button style={{borderRadius: '1.2rem', width: '80%'}}>1111</Button>
                        <div>OS</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlLocate