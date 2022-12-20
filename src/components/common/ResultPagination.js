import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import {Message} from "../../utils/message";

const pageButtonStyle = {
    width: '2.5rem',
    border: '1px solid #999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}

const selectedPageButtonStyle = {
    ...pageButtonStyle,
    border: '1px solid #418bfe',
    color: '#418bfe'
}

const ResultPagination = ({page, setPage, pages}) => {
    const [blocks, setBlocks] = useState([])
    const [inputPage, setInputPage] = useState(1)

    const handleLast = () => {
        page === 1 ? Message.warning({message: '当前已是第一页!'}) : setPage(page - 1)
    }
    const handleNext = () => {
        page === pages ? Message.warning({message: '当前已是最后一页!'}) : setPage(page + 1)
    }
    const on_change = (e) => {
        setInputPage(e.target.value)
    }
    const on_key_down = (e) => {
        if (e.key === 'Enter') {
            inputPage < 1 || inputPage > pages ? Message.warning({message: '无效页码!'}) : setPage(inputPage)
        }
    }

    useEffect(() => setBlocks([...Array.from({length: pages}, (_, i) => i + 1)]), [pages])

    return (
        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
            <div onClick={handleLast} style={pageButtonStyle}><LeftOutlined/></div>
            {blocks.map((b, i) => {
                return <div key={i} onClick={() => setPage(b)} style={page === b ? selectedPageButtonStyle : pageButtonStyle}>{b}</div>
            })}
            <div onClick={handleNext} style={pageButtonStyle}><RightOutlined/></div>

            <div style={{display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                <div>跳至</div>
                <input type={'text'} value={inputPage} onChange={on_change} onKeyDown={on_key_down} style={{outlineStyle: 'none', width: '3.5rem', borderRadius: '0.2rem', border: '1px solid #999', background: '#5a5e61'}}/>
                <div>页</div>
            </div>
        </div>
    )
}

export default ResultPagination