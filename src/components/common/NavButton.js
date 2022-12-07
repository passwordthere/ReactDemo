const NavButton = ({icon, text, handleClick, selected}) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 3rem",
            fontSize: "2rem",
            fontWeight: "600",
            position: "relative",
            cursor: "pointer"
        }}
             onClick={handleClick}
        >
            <img style={{height: "2.8rem", width: "2.8rem", margin: "0 1rem"}} src={require('../../assets/image/' + icon).default} alt='icon'/>
            <div style={{margin: "0 1rem 0 0"}}>{text}</div>
            <div style={{height: "0.2rem", position: "absolute", width: "100%", background: "rgb(70, 140, 250)", top: "calc(100% - 0.2rem)", display: selected ? "block" : "none"}}/>
        </div>
    )
}

export default NavButton