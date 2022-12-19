import './Camera.css'
import Links from "../../Links";

const Camera = () => {
    return (
        <div className='Camera'>
            <div className='CameraWrapper'>
                <div className='CameraODOS'>
                    <div className='CameraODOSHeader'>OD</div>
                    <div className='CameraODOSContent'>
                        <img src={Links().base + 'stream_od/'} alt='stream_od' width='100%' height='100%'/>
                        {/*<img src={Links().media + 'OD.jpg'} alt='stream_od' width='100%' height='100%'/>*/}
                    </div>
                </div>
                <div className='CameraODOS'>
                    <div className='CameraODOSHeader'>OS</div>
                    <div className='CameraODOSContent'>
                        <img src={Links().base + 'stream_os/'} alt='stream_os' width='100%' height='100%'/>
                        {/*<img src={Links().media + 'OS.jpg'} alt='stream_os' width='100%' height='100%'/>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Camera