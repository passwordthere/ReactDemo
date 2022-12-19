import Status from "./panels/Status";
import React, {useEffect, useState} from "react";
import './Home.css'
import Camera from "./panels/Camera";
import Control from "./panels/Control";
import ControlLocate from "./panels/ControlLocate";
import Preview from "./panels/Preview";
import Report from "./panels/Report";
import {ChangeStatusAPI, LocateAPI, ProptosisAPI, ReportAPI, RotationAPI, SurfaceAPI, WidthAPI} from "../api";
import PreviewRotation from "./panels/PreviewRotation";
import PreviewWidth from "./panels/PreviewWidth";

const sleep = (s) => {
    return new Promise(resolve => setTimeout(resolve, s * 1000))
}

export const statusList = ['locate', 'surface', 'proptosis', 'width', 'rotation', 'rating', 'report']
export const rotationImgOrder = [5, 2, 1, 4, 7, 8, 9, 6, 3]

const Home = () => {
    const [currentStatus, setCurrentStatus] = useState(statusList[0])    // locate, surface, proptosis, width, rotation, rating, report
    const [finishedStatus, setFinishedStatus] = useState([])

    const [selectedNum, setSelectedNum] = useState(1)

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
        if (!['rating', 'report'].includes(currentStatus)) {
            // currentStatus === statusList[4] ? setSelectedNum(5) : setSelectedNum(1)
            setSelectedNum(1)
            ChangeStatusAPI({step: currentStatus})
        }

        switch (currentStatus) {
            case statusList[0]:
                setCurrentPreviewImg(locateImg)
                break
            case statusList[1]:
                setCurrentPreviewImg(surfaceImg)
                break
            case statusList[2]:
                setCurrentPreviewImg(proptosisImg)
                break
            case statusList[3]:
                break
            case statusList[4]:
                break
            case statusList[5]:
                break
            case statusList[6]:
                ReportAPI().then(res => setReport(res.data.pdf))
                break

            //    no default
        }
    }
    const eventTakingPhoto = async () => {
        let params = {}
        switch (currentStatus) {
            case 'locate':
                LocateAPI().then(res => {
                    setLocateImg(res.data.img)
                    setCurrentPreviewImg(res.data.img)
                })
                break
            case 'surface':
                SurfaceAPI().then(res => {
                    setSurfaceImg(res.data.img)
                    setCurrentPreviewImg(res.data.img)
                })
                break
            case 'proptosis':
                params = {
                    side: selectedNum === 1 ? 'od' : 'os'
                }
                ProptosisAPI(params).then(res => {
                    setProptosisImg(res.data.img)
                    setProptosisRet(res.data.ret)
                    setCurrentPreviewImg(res.data.img)
                })
                break
            case 'width':
                WidthAPI().then(res => {
                    setWidthImg(res.data.img.width)
                    setWidthRet(res.data.ret.width)
                    setRednessImg(res.data.img.redness)
                    setRednessRet(res.data.ret.redness)
                })
                break
            case 'rotation':
                if (rotationPlot.every(i => i === null)) {
                    for (let i=1; i <=9; i++) {
                        setSelectedNum(i)

                        params = {
                            re: 0,
                            id: i - 1,
                        }
                        RotationAPI(params).then(res => {
                            setRotationImg(res.data.img)
                            if (i === 9) setRotationPlot(res.data.plot)
                        })

                        await sleep(7)
                    }
                } else {
                    params = {
                        re: 1,
                        id: selectedNum - 1,
                    }
                    RotationAPI(params).then(res => {
                        setRotationImg(res.data.img)
                        setRotationPlot(res.data.plot)
                    })
                }

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
                            <Control currentStatus={currentStatus} setCurrentStatus={setCurrentStatus}
                                     eventTakingPhoto={eventTakingPhoto}/>}
                    </div>
                </div>
                <div className='Wrapper2'>
                    <div className='WrapperPreview'>
                        {
                            currentStatus === statusList[3] ? (
                                    <PreviewWidth widthImg={widthImg} setWidthImg={setWidthImg} widthRet={widthRet} setWidthRet={setWidthRet}
                                                  rednessImg={rednessImg} setRednessImg={setRednessImg} rednessRet={rednessRet} setRednessRet={setRednessRet}
                                                  selectedNum={selectedNum} setSelectedNum={setSelectedNum}/>)
                                : currentStatus === statusList[4] ? (
                                        <PreviewRotation rotationImg={rotationImg} rotationPlot={rotationPlot}
                                                         selectedNum={selectedNum} setSelectedNum={setSelectedNum}/>)
                                    : currentStatus === statusList[6] ? (<div style={{background: '#31363a', width: '100%', height: '100%'}}/>)
                                        : (<Preview currentStatus={currentStatus} currentPreviewImg={currentPreviewImg}
                                                    proptosisRet={proptosisRet}
                                                    selectedNum={selectedNum} setSelectedNum={setSelectedNum}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home