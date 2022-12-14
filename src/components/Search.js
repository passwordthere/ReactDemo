import React from "react";
import './Search.css'
import Condition from "./panelsSearch/Condition";
import Result from "./panelsSearch/Result";

const Search = () => {
    return (
        <div className='Search'>
            <div className={'ConditionPanel'}><Condition /></div>
            <div className={'ResultPanel'}><Result /></div>
        </div>
    )
}

export default Search