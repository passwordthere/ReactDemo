import Status from "./panels/Status";
import React, {useEffect, useState} from "react";
import './Home.css'
import Camera from "./panels/Camera";
import Control from "./panels/Control";
import ControlLocate from "./panels/ControlLocate";
import Preview from "./panels/Preview";
import Report from "./panels/Report";
import {LocateAPI, ProptosisAPI, ReportAPI, SurfaceAPI} from "../api";

const Home = () => {
    const [currentStatus, setCurrentStatus] = useState('locate')    // locate, surface, proptosis, width, rotation, rating, report
    const [finishedStatus, setFinishedStatus] = useState([])

    // result of backend
    const [locateImg, setLocateImg] = useState(null)
    const [surfaceImg, setSurfaceImg] = useState(null)
    const [proptosisImg, setProptosisImg] = useState(null)
    const [proptosisRet, setProptosisRet] = useState(null)
    const [widthImg, setWidthImg] = useState(null)
    const [widthRet, setWidthRet] = useState(null)
    const [rednessImg, setRednessImg] = useState(null)
    const [rednessRet, setRednessRet] = useState(null)
    const [rotationImg, setRotationImg] = useState(null)
    const [rotationPlot, setRotationPlot] = useState(null)
    const [report, setReport] = useState(null)

    const [currentPreviewImg, setCurrentPreviewImg] = useState(locateImg)

    useEffect(() => eventChangingStatus(), [currentStatus])
    const eventChangingStatus = () => {
        switch (currentStatus) {
            case 'locate':
                console.log('locate')
                // ChangeStatusAPI
                setCurrentPreviewImg(locateImg)
                break
            case 'surface':
                console.log('surface')
                setCurrentPreviewImg(surfaceImg)
                break
            case 'proptosis':
                console.log('proptosis')
                setCurrentPreviewImg(proptosisImg)
                break
            case 'width':
                console.log('width');
                setCurrentPreviewImg(widthImg)
                break
            case 'rotation':
                console.log('rotation')
                setCurrentPreviewImg(rotationImg)
                break
            case 'rating':
                console.log('rating')
                break
            case 'report':
                console.log('report')
                ReportAPI().then(res => setReport(res.data.pdf))
                break
        }
    }
    const eventTakingPhoto = () => {
        switch (currentStatus) {
            case 'locate':
                console.log('locate')
                LocateAPI().then(res => setLocateImg(res.data.img))
                break
            case 'surface':
                console.log('surface');
                SurfaceAPI().then(res => setSurfaceImg(res.data.img))
                break
            case 'proptosis':
                console.log('proptosis')
                // ProptosisAPI().then(res => {
                //     const {img, ret} = res.data
                //     setProptosisImg(res.data.);
                //     setProptosisRet()
                // })
                break
            case 'width':
                console.log('width');
                break
            case 'rotation':
                console.log('rotation')
                break
        }
    }

    return (
        <div className='Home'>
            <div className='StatusPanel'>
                <Status currentStatus={currentStatus} finishedStatus={finishedStatus} setCurrentStatus={setCurrentStatus}/>
            </div>
            <div className='Wrapper'>
                <div className='Wrapper1'>
                    <div className='WrapperCamera'>
                        {currentStatus === 'report' ? <Report report={report} setReport={setReport}/> : <Camera/>}
                    </div>
                    <div className='WrapperControl'>
                        {currentStatus === 'locate' ? <ControlLocate eventTakingPhoto={eventTakingPhoto}/> : <Control currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} eventTakingPhoto={eventTakingPhoto}/>}
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