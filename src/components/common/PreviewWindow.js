import black from "../../assets/image/black.png";
import {useState} from "react";
import Links from "../../Links";

const PreviewWindow = ({src, fontS, selected}) => {
    const [hover, setHover] = useState(false)

    const PreviewWindowStyle = {
        border: selected ? '1px solid rgb(70, 140, 250)' : 'none',
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
    }
    const HoverStyle = {
        display: hover ? 'block' : 'none',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        position: 'absolute',
        margin: 'auto'
    }
    const HoverTextStyle = {
        fontSize: fontS ? fontS : '3rem',
        fontWeight: '600',
        color: '#fff',
        transform: "translate(-50%,-50%)",
        position: 'absolute',
        top: '50%',
        left: '50%',
    }


    return (
        <div style={PreviewWindowStyle} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)}>
            <div style={HoverStyle}>
                <img style={{width: '100%', height: '100%', opacity: '0.5'}} src={black} alt='black'/>
                <div style={HoverTextStyle}>重拍</div>
            </div>
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                <img style={{maxWidth: '100%', maxHeight: '100%', margin: 'auto', textAlign: 'center'}} src={src ? Links().media + src : Links().media + 'baiyi.jpg'} alt='src'/>
            </div>
        </div>
    )
}

export default PreviewWindow