import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import Form from "react-bootstrap/Form";
import {useState} from "react";

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

const ResultPagination = () => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
            <div style={pageButtonStyle}><LeftOutlined/></div>
            <div style={true ? selectedPageButtonStyle : pageButtonStyle}>{currentPage}</div>
            <div style={pageButtonStyle}><RightOutlined/></div>

            <div style={{display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                <div>跳至</div>
                <input style={{width: '4rem', borderRadius: '0.2rem', border: '1px solid #999', background: '#5a5e61'}}/>
                <div>页</div>
            </div>
        </div>
    )
}

export default ResultPagination