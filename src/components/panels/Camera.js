import './Camera.css'
import Links from "../../Links";
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure';

const Camera = () => {
    return (
        <div className='Camera'>
            <div className='CameraWrapper'>
                <div className='CameraOD'>
                    <div className='CameraODHeader'>OD</div>
                    <div className='CameraODContent'><img src={Links().media + 'OD.jpg'} width='100%' height='100%'/></div>
                </div>
                <div className='CameraOS'>
                    <div className='CameraOSHeader'>OS</div>
                    <div className='CameraOSContent'><img src={Links().media + 'OS.jpg'} width='100%' height='100%'/></div>
                </div>
            </div>
        </div>
    )
}

export default Camera