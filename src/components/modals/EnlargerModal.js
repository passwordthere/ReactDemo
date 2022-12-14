import Modal from 'react-bootstrap/Modal';
import './EnlargerModal.css'
import {useEffect, useState} from "react";
import {CaretLeftOutlined, CaretRightOutlined} from '@ant-design/icons';
import baiyi from '../../assets/image/baiyi.jpg'

const EnlargerModal = ({index, show, hide, side, rotationImg}) => {
    const [title, setTitle] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(index)
    const [buttonHovers, setButtonHovers] = useState([false, false])
    const [hovers, setHovers] = useState([false, false, false, false, false, false, false, false, false])

    const handleLast = () => currentIndex === 0 ? setCurrentIndex(8) : setCurrentIndex(currentIndex - 1)
    const handleNext = () => currentIndex === 8 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    const button_mouse_enter = (i) => {
        const newButtonHovers = buttonHovers.map((hover, hoverIndex) => {
            if (hoverIndex === i) return !hover
            return null
        })
        setButtonHovers(newButtonHovers)
    }
    const mouse_enter = (i) => {
        const newHovers = hovers.map((hover, hoverIndex) => {
            if (hoverIndex === i) return !hover
            return null
        })
        setHovers(newHovers)
    }

    useEffect(() => {
        currentIndex === 0 ? setTitle('左上')
            : currentIndex === 1 ? setTitle('正上')
                : currentIndex === 2 ? setTitle('右上')
                    : currentIndex === 3 ? setTitle('正左')
                        : currentIndex === 4 ? setTitle('正视')
                            : currentIndex === 5 ? setTitle('正右')
                                : currentIndex === 6 ? setTitle('左下')
                                    : currentIndex === 7 ? setTitle('正下')
                                        : setTitle('右下')
    }, [currentIndex])

    return (
        <Modal className='EnlargerModal' fullscreen={true} size={'lg'} show={show} onHide={hide} backdrop="static" keyboard={false} centered>
            <div className='EnlargerModalHeader'>
                <div style={{width: '100%', display: 'flex', gap: '4rem', justifyContent: 'center'}}>
                    <div>{currentIndex + 1}/9</div>
                    <div>{side === 0 ? 'OD' : 'OS'}，{title}</div>
                </div>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hide}/>
            </div>

            <div className='EnlargerModalContent'>
                <div onClick={handleLast} onMouseEnter={() => button_mouse_enter(0)} onMouseLeave={() => button_mouse_enter(0)} style={{padding: '4rem', cursor: 'pointer'}}>
                    <CaretLeftOutlined style={{fontSize: '2.2rem', opacity: buttonHovers[0] ? '1' : '0.5'}}/>
                </div>
                <div style={{width: '60%', height: '80%', background: 'black', display: 'flex', justifyContent: 'center'}}>
                    <img src={rotationImg[currentIndex] ? rotationImg[currentIndex] : baiyi} style={{maxWidth: '100%', maxHeight: '100%', margin: 'auto'}} alt='zoom'/>
                </div>
                <div onClick={handleNext} onMouseEnter={() => button_mouse_enter(1)} onMouseLeave={() => button_mouse_enter(1)} style={{padding: '4rem', cursor: 'pointer'}}>
                    <CaretRightOutlined style={{fontSize: '2.2rem', opacity: buttonHovers[1] ? '1' : '0.5'}}/>
                </div>
            </div>

            <div className='EnlargerModalFooter'>
                {rotationImg.map((s, i) => {
                    return (
                        <div key={i}
                             onClick={() => setCurrentIndex(i)}
                             onMouseEnter={() => mouse_enter(i)}
                             onMouseLeave={() => mouse_enter(i)}
                             style={{background: 'black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', cursor: 'pointer'}}>
                            <img src={s ? s : baiyi} style={{maxWidth: '100%', maxHeight: '100%', margin: 'auto', opacity: currentIndex === i ? '1' : hovers[i] ? '1' : '0.5'}} alt='thumbnail'/>
                        </div>
                    )
                })}
            </div>
        </Modal>
    );
};

export default EnlargerModal