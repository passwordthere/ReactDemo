import Modal from 'react-bootstrap/Modal';
import './EditorModal.css'
import {CaretLeftOutlined, CaretRightOutlined} from "@ant-design/icons";
import BootstrapRoundButton from "../common/BootstrapRoundButton";
import {useEffect, useReducer, useRef, useState} from "react";
import EditorModalCanvas from "../common/EditorModalCanvas";

const tagTitle = ['请测量距离', '请绘制面积', '请测量距离', '请绘制面积']
const tagDes = ['请在照片上分别点击起点和终点测量宽度', '请在照片上用打点连线的方式绘制面积。鼠标左键点击及移动即可绘制图形；鼠标左键双击即可结束，会自动闭合。', '请在照片上分别点击起点和终点测量宽度', '请在照片上用打点连线的方式绘制面积。鼠标左键点击及移动即可绘制图形；鼠标左键双击即可结束，会自动闭合。']
const tagSlide = ['OD，眼裂宽度', 'OD，结膜充血', 'OS，眼裂宽度', 'OS，结膜充血']

const singleData = {
    points: [],
    width: 0,
    upper: 0,
    lower: 0,
}
const initialData = [singleData, singleData, singleData, singleData]

function init() {
    return initialData
}

function reducer(data, action) {
    switch (action.type) {
        case 'setPoints':
            return data.map((d, i) => {
                if (i === action.index) return {...d, points: action.points}
                else return d
            })
        case 'setWidth':
            return data.map((d, i) => {
                if (i === action.index) return {...d, width: action.width}
                else return d
            })
        case 'setEyelid':
            return data.map((d, i) => {
                if (i === action.index) return {...d, upper: action.upper, lower: action.lower}
                else return d
            })
        case 'reset':
            return init()
        default:
            throw new Error()
    }
}

const EditorModal = ({show, hide}) => {
    const stageParentNode = useRef(null)
    const [stageWH, setStageWH] = useState([0, 0])
    const [index, setIndex] = useState(0)
    const [data, dispatch] = useReducer(reducer, initialData, init)

    const handleLast = () => {
        if (index + 1 !== 1) setIndex(index - 1)
    }
    const handleNext = () => {
        if (index + 1 !== 4) setIndex(index + 1)
    }
    // const confirm = () => {
    // }

    useEffect(() => console.log(data), [data])

    useEffect(() => {
        setStageWH([stageParentNode.current.offsetWidth, stageParentNode.current.offsetWidth])
    }, [])


    return (
        <Modal size='xl' show={show} onHide={hide} backdrop="static" keyboard={false} centered>
            <div className='EditorModal'>
                <div className='EditorModalHeader'>
                    <div>
                        手动选择照片
                    </div>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hide}/>
                </div>


                <div style={{height: "1px", background: "#555", margin: '0 2rem'}}/>


                <div className='EditorModalContent'>
                    <div className='EditorModalContentLeft'>
                        <div>{tagTitle[index]}</div>
                        <div style={{display: 'flex'}}>
                            <div onClick={handleLast} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}><CaretLeftOutlined style={{fontSize: '2.2rem'}}/></div>
                            <div ref={stageParentNode} style={{width: '100%', height: '100%'}}>
                                <EditorModalCanvas stageWH={stageWH} srcList={['OD.jpg', 'OS.jpg', 'baiyi.jpg', 'OD.jpg']} index={index} dispatch={dispatch}/>
                            </div>
                            <div onClick={handleNext} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}><CaretRightOutlined style={{fontSize: '2.2rem'}}/></div>
                        </div>
                        <div style={{padding: '2rem', height: '5em'}}>{tagDes[index]}</div>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '4rem', fontSize: '2rem'}}>
                            <div>{index + 1}/4</div>
                            <div>{tagSlide[index]}</div>
                        </div>
                    </div>


                    <div style={{width: '1px', background: '#555'}}/>


                    <div className='EditorModalContentRight'>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
                            <div>眼裂宽度</div>
                            <div>OD: {data[0].width}</div>
                            <div>OS: {data[2].width}</div>
                            <div>上睑退缩</div>
                            <div>OD: {data[0].upper}</div>
                            <div>OS: {data[2].upper}</div>
                            <div>下睑退缩</div>
                            <div>OD: {data[0].lower}</div>
                            <div>OS: {data[2].lower}</div>
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <BootstrapRoundButton variant='outline-primary' text='放弃绘制'/>
                            {index + 1 === 4 ? <BootstrapRoundButton variant='primary' text='完成'/> : <BootstrapRoundButton onClick={handleNext} variant='primary' text='下一页'/>}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditorModal