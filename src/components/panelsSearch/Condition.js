import './Condition.css'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";

const InputStyle = {
    background: '#5a5e61',
    border: '1px solid #999',
    width: '18rem',
    height: '4rem',
    // padding: '1rem 2rem',
    fontSize: '1.8rem',
    color: '#cecece',
}

const Condition = () => {
    const [name, setName] = useState('')

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
                    <Col sm="8"><Form.Control style={InputStyle} value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} type="textarea" autoFocus/></Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">检测时间</Form.Label>
                    <Col sm="8"><Form.Control style={InputStyle} value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} type="textarea" autoFocus/></Col>
                </Form.Group>

                {/*<div>姓名</div>*/}
                {/*<div>门诊号</div>*/}
                {/*<div>检测时间</div>*/}
                <div>查询</div>
            </div>
        </div>
    )
}

export default Condition