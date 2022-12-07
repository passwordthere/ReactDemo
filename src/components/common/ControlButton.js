const ControlButton = ({round, text}) => {
    const defaultStyle = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        boxSizing: "border-box",
        padding: round ? "2rem" : "0.8rem  2rem",
        background: "#333",
        borderRadius: round ? "50%" : "2.5rem",
        boxShadow: "0 0 0.8rem #47f",
        textAlign: "center",
        fontSize: "1.8rem",
        fontWeight: "600"
    }

    return (
        <div style={defaultStyle}>
            {text}
        </div>
    )
}

export default ControlButton