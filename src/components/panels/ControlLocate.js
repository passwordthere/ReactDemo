import './ControlLocate.css'
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined} from '@ant-design/icons';
import BootstrapRoundButton from "../common/BootstrapRoundButton";
import {LocateAdjustAPI} from "../../api";


const ControlLocate = ({eventTakingPhoto}) => {
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
            LocateAdjustAPI({action: 'od_stop'})
            LocateAdjustAPI({action: 'os_stop'})
        } else LocateAdjustAPI({action: action})
    }

    return (
        <div className='ControlLocate'>
            <div className='LeftControlLocate'>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>颌拖（mm）</div>
                    <div><Form.Control style={inputStyle} className='outline-primary' type="textarea" placeholder='0' autoFocus/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onMouseDown={() => on_mouse_down('jaw_in')} onMouseUp={() => on_mouse_up('jaw_stop')} style={buttonStyle}><CaretUpOutlined/>上移</Button>
                        <Button onMouseDown={() => on_mouse_down('jaw_out')} onMouseUp={() => on_mouse_up('jaw_stop')} style={buttonStyle}><CaretDownOutlined/>下移</Button>
                    </div>
                </div>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>额拖（mm）</div>
                    <div><Form.Control style={inputStyle} className='outline-primary' type="textarea" placeholder='0'/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onMouseDown={() => on_mouse_down('forehead_in')} onMouseUp={() => on_mouse_up('forehead_stop')} style={buttonStyle}><CaretUpOutlined/>上移</Button>
                        <Button onMouseDown={() => on_mouse_down('forehead_out')} onMouseUp={() => on_mouse_up('forehead_stop')} style={buttonStyle}><CaretDownOutlined/>下移</Button>
                    </div>
                </div>
            </div>
            <div className='MidControlLocate'>
                <Button onClick={eventTakingPhoto} className="rounded-circle" style={{padding: '40px', fontSize: '2.8rem'}}>拍摄</Button>
            </div>
            <div className='RightControlLocate'>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>眶距（mm）</div>
                    <div><Form.Control style={inputStyle} className='outline-primary' type="textarea" placeholder='0'/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onMouseDown={() => on_mouse_down('eyes_in')} onMouseUp={() => on_mouse_up('eyes_stop')} style={buttonStyle}><CaretLeftOutlined/>左移</Button>
                        <Button onMouseDown={() => on_mouse_down('eyes_out')} onMouseUp={() => on_mouse_up('eyes_stop')} style={buttonStyle}><CaretRightOutlined/>右移</Button>
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