const TagButton = ({text, handleClick, selected}) => {
    return (
        <div style={{
            borderBottom: selected ? '0.2rem solid rgb(70, 140, 250)' : 'none',
            color: selected ? 'rgb(70, 140, 250)' : '#cecece',
            fontSize: '1.6rem',
            fontWeight: '600',
            cursor: "pointer",
            padding: '0.1rem'
        }}
             onClick={handleClick}>
            {text}
        </div>
    )
}

export default TagButton