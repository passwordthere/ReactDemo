import {useEffect, useState} from "react";

const RatingButtonPair = ({resultIndex, result, setResult}) => {
    const unselectedStyle = {background: '#bbbfc3', borderRadius: '.25rem', height: '20px', width: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}
    const selectedStyle = {...unselectedStyle, background: '#418bfe', color: '#ffffff'}

    const [selected, setSelected] = useState(0)
    const [style, setStyle] = useState([selectedStyle, unselectedStyle])

    useEffect(() => selected === 0 ? setStyle([selectedStyle, unselectedStyle]) : setStyle([unselectedStyle, selectedStyle]), [selected])
    useEffect(() => {
        const newResult = result.map((item, index) => {
            if (index === resultIndex) {
                return selected
            } else {
                return item
            }
        })
        setResult(newResult)
    }, [selected])

    return (
        <div style={{display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#797a7b', fontWeight: '600'}}>
            <div style={style[0]} onClick={() => setSelected(0)}>0</div>
            <div style={style[1]} onClick={() => setSelected(1)}>1</div>
        </div>
    )
}

export default RatingButtonPair