import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import './Nav.css'
import brand from '../../assets/image/brand.png'
import avatar from '../../assets/image/avatar.png'
import NavButton from "../common/NavButton";
import Cookies from "universal-cookie/es6";
import PatientModal from "../modals/PatientModal";

const Nav = ({history, currentNav, setCurrentNav}) => {
    const [hover, setHover] = useState(false)

    const handle_logout = async () => {
        const cookies = new Cookies();
        await cookies.remove('accessToken', {path: '/'})
        await cookies.remove('refreshToken', {path: '/'})
        await cookies.remove('accessToken', {path: '/main'})
        await cookies.remove('refreshToken', {path: '/main'})
        history.push("/");
        window.location.reload();
    }

    const handle_home = () => {
        setCurrentNav('home')
    }
    const handle_search = () => {
        setCurrentNav('search')
    }
    const handle_patient = () => {
        showModal()
    }

    // Modal Dialog
    const [modalVisible, setModalVisible] = useState(false)
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    const mouse_enter = () => {
        setHover(true)
    }
    const mouse_leave = () => {
        setHover(false)
    }
    return (
        <div className='Nav'>
            <div className='LogoAndButtons'>
                <img src={brand} alt='brand.png' height='100%'/>
                <NavButton icon='home.png' text='首页' handleClick={handle_home} selected={currentNav === 'home'}/>
                <NavButton icon='menu.png' text='病例查询' handleClick={handle_search} selected={currentNav === 'search'}/>
                <NavButton icon='idcard.png' text='受试者信息' handleClick={handle_patient} selected={currentNav === 'patient'}/>
            </div>

            <div className='Avatar' onMouseEnter={mouse_enter} onMouseLeave={mouse_leave}>
                <img src={avatar} alt='avatar.png' height='90%' />
                <div style={{display: "inline-block", padding: "1.5rem", fontSize: "1.5rem", fontWeight: "600"}}>
                    Admin
                </div>
                {hover && <div className='AvatarMenu' onMouseEnter={mouse_enter} onMouseLeave={mouse_leave} onClick={handle_logout}>退出登录</div>}
            </div>

            {modalVisible && (<PatientModal show={showModal} hide={hideModal} />)}
        </div>
    )
}

export default withRouter(Nav)