import Modal from 'react-bootstrap/Modal';
import './RatingModal.css'
import {useEffect, useState} from "react";
import {RatingAPI, ReportAPI} from "../../api";
import RatingButtonPair from "../common/RatingButtonPair";

const RatingModal = ({show, hide, result, setResult, handleReport, setReport}) => {
    const ratingList = [
        '自发性眼眶疼痛',
        '眼球运动诱发疼痛',
        '眼睑水肿',
        '眼睑充血',
        '结膜充血',
        '球结膜水肿',
        '泪阜或皱襞炎症',
        '眼球突出增长≥2mm',
        '眼球运动下降≤8°',
        '视力下降≥1行',
    ]
    // const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [sum, setSum] = useState(0)
    useEffect(() => setSum(result.reduce((a, b) => a + b)), [result])

    const confirm = () => {
        RatingAPI({result: result.toString()}).then(res => {
            if (res.code === 0) ReportAPI().then(res => setReport(res.data.png))
        })
        hide()
        handleReport()  // 跳转报告
    }

    return (
        <Modal size={'lg'} show={show} onHide={hide} backdrop="static" keyboard={false} centered>
            <div className='RatingModal'>
                <div className='RatingModalHeader'>
                    <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <div style={{background: 'rgb(70, 140, 250)', width: '6px', height: '6px', borderRadius: '2rem'}}/>
                        初诊
                    </div>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={confirm}/>
                </div>

                <div className='RatingModalBody'>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 5rem'}}>
                        <div>编号</div>
                        <div>体征</div>
                        <div>评分</div>
                    </div>
                    <div style={{height: "2px", background: "#555", margin: "1.2rem .5rem"}}/>
                    {ratingList.map((val, key) => {
                        const num = key + 1
                        return (
                            <div key={key}>
                                {num === 8 && <div style={{height: "2px", background: "repeating-linear-gradient(90deg,#555 0 5px,#0000 0 9px)", margin: "1.2rem 0"}}/>}
                                <div style={{display: 'flex', justifyContent: 'space-between', padding: '.5rem 4.5rem .5rem 6rem', alignItems: 'center'}}>
                                    <div>{num}</div>
                                    <div>{val}</div>
                                    <div style={{display: 'flex', gap: '5px'}}>
                                        <RatingButtonPair resultIndex={key} result={result} setResult={setResult}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='RatingModalFooter'>
                    总分
                    <div style={{borderBottom: '1px solid #555', width: '8%', textAlign: 'center'}}>{sum}</div>
                </div>
            </div>
        </Modal>
    );
};

export default RatingModal