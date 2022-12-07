import {useEffect, useState} from "react";

const StatusButton = ({text, handleClick, current, finished, round}) => {
    const defaultStyle = {
        display: "inline-block",
        color: "#fff",
        boxSizing: "border-box",
        padding: round ? '1rem 6rem' : "1rem 2rem",
        background: "#333",
        borderRadius: round ? "3rem" : "0.5rem",
        textAlign: "center",
        fontSize: round ? "2rem" : "1.6rem",
        fontWeight: "300",
        border: '1px solid #fff',
    }
    const [hover, setHover] = useState(false)
    const [style, setStyle] = useState(defaultStyle)

    useEffect(() => {
        if (hover) {
            if (current) {
                setStyle({
                    ...defaultStyle,
                    color: 'rgb(70, 140, 250)',
                    border: '1px solid rgb(70, 140, 250)',
                    cursor: "pointer",
                })
            } else if (finished) {
                setStyle({
                    ...defaultStyle,
                    background: 'rgb(70, 140, 250)',
                    border: 'none',
                    cursor: "pointer",
                })
            } else {
                setStyle({
                    ...defaultStyle,
                    color: 'rgb(70, 140, 250)',
                    border: '1px solid rgb(70, 140, 250)',
                    cursor: "pointer",
                })
            }
        } else {
            if (current) {
                setStyle({
                    ...defaultStyle,
                    color: 'rgb(70, 140, 250)',
                    border: '1px solid rgb(70, 140, 250)',
                    cursor: "default",
                })
            } else if (finished) {
                setStyle({
                    ...defaultStyle,
                    background: 'rgb(90, 150, 255)',
                    border: 'none',
                    cursor: "default",
                })
            } else {
                setStyle({
                    ...defaultStyle,
                    cursor: "default"
                })
            }
        }
    }, [hover, current, finished, round])

    const mouse_enter = () => {
        setHover(!hover)
    }
    const mouse_leave = () => {
        mouse_enter()
    }

    return (
        <div style={style}
             onMouseEnter={mouse_enter}
             onMouseLeave={mouse_leave}
             onClick={handleClick}
        >
            {text}
        </div>
    )
}

export default StatusButton