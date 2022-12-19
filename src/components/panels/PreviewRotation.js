import './PreviewRotation.css'
import React, {useEffect, useState} from "react";
import TagButton from "../common/TagButton";
import PreviewWindow from "../common/PreviewWindow";
import {BulbOutlined} from "@ant-design/icons";
import black from '../../assets/image/rating.png'
import EnlargerModal from "../modals/EnlargerModal";
import Links from "../../Links";

const windowOrder = [3, 2, 9, 4, 1, 8, 5, 6, 7]

const tagList = ['双眼模式', '单眼模式']

const PreviewRotation = ({rotationImg, rotationPlot, selectedNum, setSelectedNum}) => {
    const [currentTag, setCurrentTag] = useState(tagList[0])
    const [side, setSide] = useState(0)

    const handleWidth = () => setCurrentTag(tagList[0])
    const handleRedness = () => setCurrentTag(tagList[1])

    // Modal Dialog
    const [modalVisible, setModalVisible] = useState(false)
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    return (
        <div className='PreviewRotation'>
            <div className='HeaderPreviewRotation'>
                <TagButton text={tagList[0]} selected={currentTag === tagList[0]} handleClick={handleWidth}/>
                <TagButton text={tagList[1]} selected={currentTag === tagList[1]} handleClick={handleRedness}/>
            </div>

            <div style={{height: "1px", background: "#555"}}/>

            {currentTag === tagList[0] ? (
                <div className='ContentPreviewRotation'>
                    <div style={{fontSize: '3rem', textAlign: 'center'}}>开发中</div>
                </div>
            ) : (
                <div className='ContentPreviewRotation'>
                    <div className='HalfContentPreviewRotation'>
                        <div className='HalfContentPreviewRotationText'>OD</div>
                        <div className='ImgAndPlot'>
                            <div className='HalfContentPreviewRotationImg'>
                                {rotationImg[0].map((s, i) => {
                                    return (
                                        <div style={{width: '100%', height: '100%'}} key={i} onClick={() => setSelectedNum(windowOrder[i])} onDoubleClick={() => {
                                            setSide(0);
                                            showModal()
                                        }}>
                                            <PreviewWindow src={rotationImg[0][windowOrder[i] - 1]} selected={selectedNum === windowOrder[i]} fontS={'1rem'}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='HalfContentPreviewRotationPlot'>
                                <img src={rotationPlot[0] === null ? black : Links().media + rotationPlot[0]} alt='plot' style={{maxWidth: '100%', maxHeight: '100%', margin: 'auto', textAlign: 'center'}}/>
                            </div>
                        </div>
                    </div>
                    <div className='HalfContentPreviewRotation'>
                        <div className='HalfContentPreviewRotationText'>OS</div>
                        <div className='ImgAndPlot'>
                            <div className='HalfContentPreviewRotationImg'>
                                {rotationImg[1].map((s, i) => {
                                    return (
                                        <div style={{width: '100%', height: '100%'}} key={i} onClick={() => setSelectedNum(windowOrder[i])} onDoubleClick={() => {
                                            setSide(1);
                                            showModal()
                                        }}>
                                            <PreviewWindow src={rotationImg[0][windowOrder[i] - 1]} selected={selectedNum === windowOrder[i]} fontS={'1rem'}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='HalfContentPreviewRotationPlot'>
                                <img src={rotationPlot[1] === null ? black : Links().media + rotationPlot[1]} alt='plot' style={{maxWidth: '100%', maxHeight: '100%', margin: 'auto'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='FooterPreviewRotation'>
                <div className='FooterTagHeader'><BulbOutlined/> Tips：单击图像区域重拍，双击鼠标左键放大</div>
            </div>

            {modalVisible && (<EnlargerModal show={showModal} hide={hideModal} index={selectedNum} side={side} rotationImg={rotationImg[side]}/>)}
        </div>
    )
}

export default PreviewRotation