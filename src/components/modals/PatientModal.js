import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PatientModal.css'
import {useEffect, useState} from "react";
import {PatientCreateAPI, DoctorListAPI, ResetAPI} from "../../api";
import {Message} from "../../utils/message";
import {sleep} from "../Home";

const PatientModal = ({show, hide}) => {
    const InputStyle = {
        background: '#5a5e61',
        border: '1px solid #5a5e61'
    }

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [id, setID] = useState('');
    const [doctor, setDoctor] = useState('');

    const confirm = () => {
        if (id === '') {
            Message.warning({message: '请输入有效身份证'})
            return
        }
        const data = {
            name: name,
            age: age,
            gender: gender,
            ID_num: id,
            doctor: doctor,
        }
        for (let dataKey in data) {
            if (!data[`${dataKey}`]) delete data[`${dataKey}`]
        }
        // ResetAPI().then(res => {
            PatientCreateAPI(data).then(_ => {
                // if (res.code === 0) {
                    hide()
                    Message.success({message: '创建成功! 等待仪器复位'});
                    sleep(2).then(_ => window.location.reload())
                // }
                return
            })
            return
        // })
    }

    const cancel = () => {
        hide()
    }

    useEffect(() => {
        const username = localStorage.getItem('username')
        DoctorListAPI({username: username}).then(res => {
            const {id} = res[0]
            setDoctor(id)
        })
    }, [])

    return (
        <Modal size={'lg'} show={show} onHide={hide} backdrop="static" keyboard={false} centered>
            <div className='PatientModal'>
                <div className='PatientModalHeader'>
                    手动输入信息
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hide}/>
                </div>

                <div style={{height: "1px", background: "#555", margin: "1.2rem 0"}}/>

                <div className='PatientModalBody'>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">姓名</Form.Label>
                        <Col sm="8">
                            <Form.Control style={InputStyle} value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} type="textarea" autoFocus/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">年龄</Form.Label>
                        <Col sm="8">
                            <Form.Control style={InputStyle} value={age} onChange={(e) => {
                                setAge(e.target.value)
                            }} type="textarea"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">性别</Form.Label>
                        <Col sm="8">
                            <Form.Control style={InputStyle} value={gender} onChange={(e) => {
                                setGender(e.target.value)
                            }} type="textarea"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">身份证</Form.Label>
                        <Col sm="8"><Form.Control style={InputStyle} value={id} onChange={(e) => {
                            setID(e.target.value)
                        }} type="textarea"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">创建医生</Form.Label>
                        <Col sm="8"><Form.Control style={InputStyle} value={localStorage.getItem('username')} onChange={(e) => {
                            setDoctor(e.target.value)
                        }} type="textarea" disabled/>
                        </Col>
                    </Form.Group>
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 2rem 2rem 2rem'}}>
                    <div onClick={cancel} className='PatientCancel'>取消</div>
                    <div onClick={confirm} className='PatientConfirm'>确定</div>
                </div>
            </div>
        </Modal>
    );
};

export default PatientModal