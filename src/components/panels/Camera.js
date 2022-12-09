import './Camera.css'
import Links from "../../Links";
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure';

const Camera = () => {
    return (
        <div className='Camera'>
            <div className='CameraWrapper'>
                <div className='CameraODOS'>
                    <div className='CameraODOSHeader'>OD</div>
                    <div className='CameraODOSContent'>
                        <img src={Links().media + 'OD.jpg'} width='100%' height='100%'/>
                    </div>
                </div>
                <div className='CameraODOS'>
                    <div className='CameraODOSHeader'>OS</div>
                    <div className='CameraODOSContent'>
                        <img src={Links().media + 'OS.jpg'} width='100%' height='100%'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Camera