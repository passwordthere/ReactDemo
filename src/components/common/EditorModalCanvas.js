import {Circle, Image, Layer, Line, Stage} from "react-konva";
import useImage from "use-image";
import Links from "../../Links";
import {useEffect, useState} from "react";
import {Message} from "../../utils/message";

const pixel_to_metric = (639 - 428) / 10
const photoWH = [1536, 1024]

const initialRecovery = [
    {
        circles: [],
        lines: []
    },
    {
        circles: [],
        lines: []
    },
    {
        circles: [],
        lines: []
    },
    {
        circles: [],
        lines: []
    },
]

const EditorModalCanvas = ({stageWH, srcList, index, dispatch}) => {
    const [image] = useImage(Links().media + srcList[index])
    const [circles, setCircles] = useState([])
    const [lines, setLines] = useState([])
    const [mode, setMode] = useState('width')
    const [recovery, setRecovery] = useState(initialRecovery)

    const cleanCirclesAndLines = () => {
        setCircles([])
        setLines([])
    }
    const updateRecovery = (itemOfRecovery) => {
        let updated = [...recovery]
        updated[index] = itemOfRecovery
        setRecovery(updated)
    }

    // switch mode & save and clean circles, lines
    useEffect(() => index === 0 || index === 2 ? setMode('width') : setMode('redness'), [index])
    useEffect(() => {

        if (mode === 'width' && circles.length === 3) {
            let currentRecovery = {circles: [...circles], lines: lines}
            currentRecovery.circles.pop()
            updateRecovery(currentRecovery)

            const width = ((Math.abs(circles[1][1] - circles[0][1]) / pixel_to_metric) / (stageWH[0] / photoWH[0])).toFixed(1)
            dispatch({type: 'setWidth', index: index, width: width})

            cleanCirclesAndLines()
            setMode('eyelid')
        }
        if (mode === 'eyelid' && circles.length === 5) {
            const upper = ((Math.abs(circles[1][1] - circles[0][1]) / pixel_to_metric) / (stageWH[0] / photoWH[0])).toFixed(1)
            const lower = ((Math.abs(circles[3][1] - circles[2][1]) / pixel_to_metric) / (stageWH[0] / photoWH[0])).toFixed(1)
            dispatch({type: 'setEyelid', index: index, upper: upper, lower: lower})

            cleanCirclesAndLines()
            setMode('width')
        }
    }, [mode, circles])
    useEffect(() => {
        if (mode === 'redness') {
            dispatch({type: 'setPoints', index: index, points: circles})

            updateRecovery({circles: [...circles], lines: lines})
        }
    }, [lines])
    // draw circles
    const handleClickImage = (e) => {
        let {x, y} = e.target.getStage().getRelativePointerPosition()

        switch (mode) {
            case 'width':
                if (circles.length === 1) x = circles[0][0]
                setCircles([...circles, [x, y]])
                break
            case 'eyelid':
                if (circles.length === 1) x = circles[0][0]
                if (circles.length === 3) x = circles[2][0]
                setCircles([...circles, [x, y]])
                break
            case 'redness':
                if (circles.length === 18) Message.warning({message: '贪多嚼不烂'})
                else setCircles([...circles, [x, y]])
                break
            // no default
        }
    };
    // draw lines (connect circles)
    useEffect(() => {
        if (circles.length < 2) return null // circles数量小于2不画线

        switch (mode) {
            case 'width':
                if (circles.length < 3) setLines([...lines, {from: circles.at(-2), to: circles.at(-1)}])
                break
            case 'eyelid':
                if (circles.length % 2 === 0) setLines([...lines, {from: circles.at(-2), to: circles.at(-1)}])
                break
            case 'redness':
                if (circles.length < 3) setLines([...lines, {from: circles.at(-2), to: circles.at(-1)}])
                if (circles.length === 3) setLines([...lines, {from: circles.at(-2), to: circles.at(-1)}, {from: circles.at(-1), to: circles.at(0)}])
                else if (circles.length > 3) {
                    const newLines = [...lines]
                    newLines.pop()
                    setLines([...newLines, {from: circles.at(-2), to: circles.at(-1)}, {from: circles.at(-1), to: circles.at(0)}])
                }
                break
            // no default
        }
    }, [circles])
    // 恢复 recovery
    useEffect(() => {
        setCircles(recovery[index].circles);
        setLines(recovery[index].lines)
    }, [index])

    return (
        <Stage width={stageWH[0]} height={stageWH[1] * 1024 / 1536}>
            <Layer>
                <Image image={image} width={stageWH[0]} height={stageWH[0] * 1024 / 1536} onClick={handleClickImage}/>
                {circles.map((pos, i) => (<Circle key={i} x={pos[0]} y={pos[1]} fill={'white'} stroke={'#03a9fc'} radius={5}/>))}
                {lines.map((pos, i) => (<Line key={i} points={[pos.from[0], pos.from[1], pos.to[0], pos.to[1]]} stroke={'white'}/>))}
            </Layer>
        </Stage>
    )
}

export default EditorModalCanvas