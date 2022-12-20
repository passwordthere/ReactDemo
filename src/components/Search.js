import React, {useState} from "react";
import './Search.css'
import Condition from "./panelsSearch/Condition";
import Result from "./panelsSearch/Result";

const Search = () => {
    const [rows, setRows] = useState([])

    return (
        <div className='Search'>
            <div className={'ConditionPanel'}><Condition setRows={setRows} /></div>
            <div className={'ResultPanel'}><Result rows={rows} /></div>
        </div>
    )
}

export default Search