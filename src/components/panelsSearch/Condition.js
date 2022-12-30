import './Condition.css'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {DetectListAPI} from "../../api";

const InputStyle = {
    background: '#5a5e61',
    // border: '1px solid #999',
    width: '18rem',
    height: '4rem',
    // padding: '1rem 2rem',
    fontSize: '1.8rem',
    color: '#cecece',
}

const Condition = ({setRows}) => {
    const [name, setName] = useState('')
    const [patientNo, setPatientNo] = useState('')
    const [date, setDate] = useState('')

    const handleQuery = () => {
        const dateList = date.split('-')
        const params = {
            name: name,
            patient_no: patientNo,
            year: dateList[0],
            month: dateList[1],
            day: dateList[2]
        }
        DetectListAPI(params).then(res => {
            setRows(res)
        })
    }

    useEffect(() => {
        DetectListAPI().then(res => {
            setRows(res)
        })
    }, [])

    return (
        <div className={'Condition'}>
            <div className={'ConditionLeft'}>查询条件</div>
            <div className={'ConditionRight'}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">姓名</Form.Label>
                    <Col sm="8"><Form.Control style={InputStyle} value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} type="textarea" autoFocus/></Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">门诊号</Form.Label>
                    <Col sm="8"><Form.Control style={InputStyle} value={patientNo} onChange={(e) => {
                        setPatientNo(e.target.value)
                    }} type="textarea" autoFocus/></Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">检测时间</Form.Label>
                    <Col sm="8"><Form.Control style={InputStyle} value={date} onChange={(e) => {
                        setDate(e.target.value)
                    }} type="date" autoFocus/></Col>
                </Form.Group>

                <Button onClick={handleQuery} style={{fontSize: '1.8rem', padding: '.5rem 5rem'}} type="submit" className="mb-2">
                    查询
                </Button>
            </div>
        </div>
    )
}

export default Condition