import Status from "./panels/Status";
import React, {useEffect, useState} from "react";
import './Home.css'
import Camera from "./panels/Camera";
import Control from "./panels/Control";
import ControlLocate from "./panels/ControlLocate";
import Preview from "./panels/Preview";
import Report from "./panels/Report";
import {ChangeStatusAPI, LocateAPI, ProptosisAPI, ReportAPI, SurfaceAPI, WidthAPI} from "../api";
import PreviewRotation from "./panels/PreviewRotation";
import PreviewWidth from "./panels/PreviewWidth";

export const statusList = ['locate', 'surface', 'proptosis', 'width', 'rotation', 'rating', 'report']

const Home = () => {
    const [currentStatus, setCurrentStatus] = useState(statusList[0])    // locate, surface, proptosis, width, rotation, rating, report
    const [finishedStatus, setFinishedStatus] = useState([])

    // result of backend
    const [locateImg, setLocateImg] = useState([null, null])
    const [surfaceImg, setSurfaceImg] = useState([null, null])
    const [proptosisImg, setProptosisImg] = useState([null, null])
    const [proptosisRet, setProptosisRet] = useState([null, null])
    const [widthImg, setWidthImg] = useState([null, null])
    const [widthRet, setWidthRet] = useState([null, null])
    const [rednessImg, setRednessImg] = useState([null, null])
    const [rednessRet, setRednessRet] = useState([null, null])
    const [rotationImg, setRotationImg] = useState([[null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null]])
    const [rotationPlot, setRotationPlot] = useState([null, null])
    const [report, setReport] = useState(null)

    const [currentPreviewImg, setCurrentPreviewImg] = useState(locateImg)

    useEffect(() => eventChangingStatus(), [currentStatus])
    const eventChangingStatus = () => {
        if (!['rating', 'report'].includes(currentStatus)) ChangeStatusAPI({step: currentStatus})

        switch (currentStatus) {
            case statusList[0]:
                console.log('locate')
                setCurrentPreviewImg(locateImg)
                break
            case statusList[1]:
                console.log('surface')
                setCurrentPreviewImg(surfaceImg)
                break
            case statusList[2]:
                console.log('proptosis')
                setCurrentPreviewImg(proptosisImg)
                break
            case statusList[3]:
                console.log('width');
                setCurrentPreviewImg(widthImg)
                break
            case statusList[4]:
                console.log('rotation')
                // setCurrentPreviewImg(rotationImg)
                break
            case statusList[5]:
                console.log('rating')
                break
            case statusList[6]:
                console.log('report')
                ReportAPI().then(res => setReport(res.data.pdf))
                break

            //    no default
        }
    }
    const eventTakingPhoto = () => {
        switch (currentStatus) {
            case 'locate':
                console.log('locate')
                LocateAPI().then(res => {
                    setLocateImg(res.data.img)
                    setCurrentPreviewImg(res.data.img)
                })
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
                // WidthAPI().then(res => {
                //
                // })
                break
            case 'rotation':
                console.log('rotation')
                break

            //    no default
        }
    }
    useEffect(() => {
        if (surfaceImg || proptosisRet || widthRet || rednessRet || rotationImg || rotationPlot) {
            console.log('生成报告啦')
        }
    }, [surfaceImg, proptosisRet, widthRet, rednessRet, rotationImg, rotationPlot])

    return (
        <div className='Home'>
            <div className='StatusPanel'>
                <Status currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} finishedStatus={finishedStatus}/>
            </div>
            <div className='Wrapper'>
                <div className='Wrapper1'>
                    <div className='WrapperCamera'>
                        {currentStatus === statusList[6] ? <Report report={report} setReport={setReport}/> : <Camera/>}
                    </div>
                    <div className='WrapperControl'>
                        {currentStatus === statusList[0] ? <ControlLocate eventTakingPhoto={eventTakingPhoto}/> :
                            <Control currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} eventTakingPhoto={eventTakingPhoto}/>}
                    </div>
                </div>
                <div className='Wrapper2'>
                    <div className='WrapperPreview'>
                        {
                            currentStatus === statusList[3] ? (<PreviewWidth currentStatus={currentStatus} widthImg={widthImg} rednessImg={rednessImg} />)
                            : currentStatus === statusList[4] ? (<PreviewRotation rotationImg={rotationImg} rotationPlot={rotationPlot}/>)
                            : (<Preview currentStatus={currentStatus} currentPreviewImg={currentPreviewImg}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home