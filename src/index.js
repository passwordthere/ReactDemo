import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route} from "react-router-dom";
import {Switch} from "react-router";
import Login from './components/Login';
import Main from "./components/Main";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Router hashType="noslash">
        <Switch>
            <Route path="/main" component={Main}/>
            <Route path="/" component={Login}/>
        </Switch>
    </Router>,
    document.querySelector("#root")
);

reportWebVitals();
