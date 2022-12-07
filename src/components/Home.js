import Status from "./panels/Status";
import React, {useState} from "react";
import './Home.css'
import Camera from "./panels/Camera";
import Control from "./panels/Control";
import ControlLocate from "./panels/ControlLocate";
import Preview from "./panels/Preview";
import Report from "./panels/Report";

const Home = () => {
    const [currentStatus, setCurrentStatus] = useState('locating')    // locating, surface, proptosis, width, rotation, rating
    const [finishedStatus, setFinishedStatus] = useState([])
    const [report, setReport] = useState(null)

    return (
        <div className='Home'>
            <div className='StatusPanel'>
                <Status currentStatus={currentStatus} finishedStatus={finishedStatus} setCurrentStatus={setCurrentStatus} setReport={setReport}/>
            </div>
            <div className='Wrapper'>
                <div className='Wrapper1'>
                    <div className='WrapperCamera'>
                        {currentStatus === 'report' ? <Report report={report} setReport={setReport}/> : <Camera/>}
                    </div>
                    <div className='WrapperControl'>
                        {currentStatus === 'locating' ? <ControlLocate/> : <Control currentStatus={currentStatus} setCurrentStatus={setCurrentStatus}/>}
                    </div>
                </div>
                <div className='Wrapper2'>
                    <div className='WrapperPreview'>
                        <Preview currentStatus={currentStatus}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home