import './PreviewWidth.css'
import React, {useEffect, useState} from "react";
import TagButton from "../common/TagButton";
import PreviewWindow from "../common/PreviewWindow";
import {BulbOutlined, SelectOutlined} from "@ant-design/icons";
import {Button} from "react-bootstrap";
import EditorModal from "../modals/EditorModal";

const tagList = ['眼裂宽度', '结膜充血']

const PreviewWidth = ({currentStatus, widthImg, rednessImg}) => {
    const [selectedNum, setSelectedNum] = useState(1)
    const [currentTag, setCurrentTag] = useState(tagList[0])
    const srcList = [widthImg[0], rednessImg[0], widthImg[1], rednessImg[1]]

    // Modal Dialog
    const [modalVisible, setModalVisible] = useState(false)
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    const handleWidth = () => setCurrentTag(tagList[0])
    const handleRedness = () => setCurrentTag(tagList[1])

    useEffect(() => currentTag === tagList[0] ? setSelectedNum(1) : setSelectedNum(3), [currentTag])

    return (
        <div className='PreviewWidth'>
            <div className='HeaderPreviewWidth'>
                <TagButton text={tagList[0]} selected={currentTag === tagList[0]} handleClick={handleWidth}/>
                <TagButton text={tagList[1]} selected={currentTag === tagList[1]} handleClick={handleRedness}/>
            </div>

            <div style={{height: "1px", background: "#555"}}/>


            <div className='ContentWidth'>
                {currentTag === tagList[0] ? (
                    <>
                        <div className='HalfContentWidth'>
                            <div className='HalfContentWidthText'>OD</div>
                            <div className='HalfContentWidthImg' onClick={() => setSelectedNum(1)}>
                                <PreviewWindow src={widthImg[0]} selected={selectedNum === 1}/>
                                <div>宽度：{}</div>
                            </div>
                        </div>
                        <div className='HalfContentWidth'>
                            <div className='HalfContentWidthText'>OS</div>
                            <div className='HalfContentWidthImg' onClick={() => setSelectedNum(2)}>
                                <PreviewWindow src={widthImg[1]} selected={selectedNum === 2}/>
                                <div>宽度：{}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='HalfContentWidth'>
                            <div className='HalfContentWidthText'>OD</div>
                            <div className='HalfContentWidthImg' onClick={() => setSelectedNum(3)}>
                                <PreviewWindow src={rednessImg[0]} selected={selectedNum === 3}/>
                                <div>面积：{}</div>
                            </div>
                        </div>
                        <div className='HalfContentWidth'>
                            <div className='HalfContentWidthText'>OS</div>
                            <div className='HalfContentWidthImg' onClick={() => setSelectedNum(4)}>
                                <PreviewWindow src={rednessImg[1]} selected={selectedNum === 4}/>
                                <div>面积：{}</div>
                            </div>
                        </div>
                    </>
                )}
                <div style={{padding: '2rem', display: 'flex', justifyContent: 'center'}}>
                    <Button disabled={srcList.some(src => src === null)} onClick={showModal}
                            style={{padding: '1rem 3rem', borderRadius: '4rem', fontSize: '1.8rem', display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', gap: '10px'}}
                            variant={'outline-primary'}>
                        <SelectOutlined/>
                        <div>手动选择</div>
                    </Button>
                </div>
            </div>

            <div className='FooterPreviewWidth'>
                <div className='FooterTagHeader'><BulbOutlined/> Tips：双击图像区域重拍</div>
            </div>

            {modalVisible && (<EditorModal show={showModal} hide={hideModal} srcList={srcList}/>)}
        </div>
    )
}

export default PreviewWidth