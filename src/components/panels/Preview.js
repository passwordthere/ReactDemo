import './Preview.css'
import {BulbOutlined} from '@ant-design/icons';
import PreviewWindow from "../common/PreviewWindow";
import React from "react";
import {statusList} from "../Home";

const Preview = ({currentStatus, currentPreviewImg, proptosisRet, selectedNum, setSelectedNum}) => {
    return (
        <div className='Preview'>
            <div className='ODOSPreview'>
                <div className='ODOSPreviewHeader'>OD</div>
                <div className='ODOSPreviewContent' onClick={() => setSelectedNum(1)}>
                    <PreviewWindow src={currentPreviewImg[0]} selected={selectedNum === 1}/>
                    {currentStatus === statusList[2] && <div style={{fontSize: '1.8rem', fontWeight: '300', textAlign: 'center', margin: '1rem 0'}}>突度：{proptosisRet[0]}</div>}
                </div>
            </div>
            <div className='ODOSPreview'>
                <div className='ODOSPreviewHeader'>OS</div>
                <div className='ODOSPreviewContent' onClick={() => setSelectedNum(2)}>
                    <PreviewWindow src={currentPreviewImg[1]} selected={selectedNum === 2}/>
                    {currentStatus === statusList[2] && <div style={{fontSize: '1.8rem', fontWeight: '300', textAlign: 'center', margin: '1rem 0'}}>突度：{proptosisRet[1]}</div>}
                </div>
            </div>

            <div className='FooterPreview'>
                {currentStatus === statusList[0] ? (
                    <div className='FooterPressure'>
                        <div className='FooterPressureHeader'>眼角压力</div>
                        <div className='FooterPressureContent'>
                            <div style={{background: 'black', width: '100%', height: '100%'}}/>
                        </div>
                    </div>
                ) : (
                    <div className='FooterTag'>
                        {/*<div className='FooterTagHeader'><BulbOutlined/> Tips：双击图像区域重拍</div>*/}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Preview