import React, {useState} from "react";
import Nav from "./panels/Nav";
import './Main.css'
import Home from "./Home";
import Search from "./Search";

if (process.env.NODE_ENV === "production") {
    // const ipcRenderer = window.ipcRenderer;
}

const Main = () => {
    const [currentNav, setCurrentNav] = useState('home')

    return (
        <div className='MainPanel'>
            <div className='NavPanel'>
                <Nav currentNav={currentNav} setCurrentNav={setCurrentNav}/>
            </div>

            <div className='ContentPanel'>
                {currentNav === 'search' ? (<Search/>) : (<Home/>)}
            </div>
        </div>
    )
}

export default Main
