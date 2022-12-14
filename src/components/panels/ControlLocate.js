import './ControlLocate.css'
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined} from '@ant-design/icons';


const ControlLocate = ({eventTakingPhoto}) => {
    const InputStyle = {
        background: '#31363a',
        border: '1px solid rgb(70, 140, 250)',
        borderRadius: '1.4rem',
        color: '#cecece',
        width: '80%',
        // fontSize: '1.6rem'
    }

    return (
        <div className='ControlLocate'>
            <div className='LeftControlLocate'>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>颌拖（mm）</div>
                    <div><Form.Control style={InputStyle} className='outline-primary' type="textarea" placeholder='0' autoFocus/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button style={{borderRadius: '1.2rem', width: '37%'}}><CaretUpOutlined/>上移</Button>
                        <Button style={{borderRadius: '1.2rem', width: '37%'}}><CaretDownOutlined/>下移</Button>
                    </div>
                </div>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>额拖（mm）</div>
                    <div><Form.Control style={InputStyle} className='outline-primary' type="textarea" placeholder='0'/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button style={{borderRadius: '1.2rem', width: '37%'}}><CaretUpOutlined/>上移</Button>
                        <Button style={{borderRadius: '1.2rem', width: '37%'}}><CaretDownOutlined/>下移</Button>
                    </div>
                </div>
            </div>
            <div className='MidControlLocate'>
                <Button onClick={eventTakingPhoto} className="rounded-circle" style={{padding: '40px', fontSize: '2.8rem'}}>拍摄</Button>
            </div>
            <div className='RightControlLocate'>
                <div style={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', fontSize: '1.6rem', fontWeight: '600'}}>
                    <div>眶距（mm）</div>
                    <div><Form.Control style={InputStyle} className='outline-primary' type="textarea" placeholder='0'/></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button style={{borderRadius: '1.2rem', width: '37%'}}><CaretLeftOutlined/>左移</Button>
                        <Button style={{borderRadius: '1.2rem', width: '37%'}}><CaretRightOutlined/>右移</Button>
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