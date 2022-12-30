import React from "react";
import Keyboard from 'react-simple-keyboard'
import '../assets/css/keyboard.css'
import layout from "simple-keyboard-layouts/build/layouts/chinese";
import {Message} from "../utils/message";
import {LoginAPI, RegisterAPI} from "../api";

export default class Login extends React.Component {
    componentWillMount() {
        console.log(process.env)
    }

    refreshPage() {
        window.location.reload();
    }

    LoginHandler = async (event) => {
        event.preventDefault();
        try {
            await LoginAPI({
                username: this.state.UserName,
                password: this.state.password,
            })
            this.props.history.push({state: this.state.UserName, pathname: "/main"});
            localStorage.setItem('username', this.state.UserName)
        } catch (e) {
            console.log(e);
            this.setState({loginFeedback: "密码错误或用户名错误"});
        }
    };

    SignupHandler = async (event) => {
        event.preventDefault();
        try {
            await RegisterAPI({
                username: this.state.UserNameSignup,
                password: this.state.passwordSignup,
                password2: this.state.confirmPassword,
            })
            this.setState({signUpFeedback: ""});
            Message.success({message: '注册成功！即将返回登陆页登陆'})
            setTimeout(() => this.refreshPage(), 1000)
        } catch (e) {
            console.log(e);
            this.setState({signUpFeedback: "两次密码输入不一致"});
        }
    };

    gotoLoginHandler = () => {
        this.setState({loginDisplay: "block", signupDisplay: "none"});
    };

    gotoSignupHandler = () => {
        this.setState({loginDisplay: "none", signupDisplay: "block"});
    };

    state = {
        k: 'Username',
        UserName: "",
        password: "",
        UserNameSignup: "",
        passwordSignup: "",
        confirmPassword: "",
        loginDisplay: "block",
        signupDisplay: "none",
        loginFeedback: "",
        signUpFeedback: "",
        show: false,
        layoutName: "default",


    };
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        this.keyboard.setInput(e.target.value)
    }
    onChange = input => {
        this.setState({
            [this.state.k]: input
        });
        this.refs[this.state.k].value = input
    }
    onKeyPress = button => {
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") this.handleShift();
    };
    handleShift = () => {
        let layoutName = this.state.layoutName;
        this.setState({
            layoutName: layoutName === "default" ? "shift" : "default"
        });
    };
    handleFocus = (e) => {
        this.setState({k: e.target.name})
        this.keyboard.setInput(this.state[e.target.name])
        this.setState({show: true})
    }
    handleBlur = () => {
        //console.log('focus')
        this.setState({show: false})
    }

    style = {
        login: {
            width: "360px",
            margin: "20vh auto 0%",
            textAlign: "center",
            padding: "30px",
        },
        input: {
            outline: 0,
            background: "#f2f2f2",
            width: "100%",
            border: 0,
            margin: "0 0 15px",
            padding: "15px",
            boxSizing: "border-box",
            fontSize: "14px",
        },
        button: {
            outline: 0,
            background: "#1a8fff",
            width: "100%",
            border: 0,
            padding: "15px",
            color: "#FFFFFF",
            fontSize: "14px",
            transition: "all 0.3 ease",
            cursor: "pointer",
            margin: "0px 0 15px",
        },
    };

    render() {
        return (
            <div
                style={{
                    backgroundImage: 'url(' + require('../assets/image/background.png').default + ')',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100vw",
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <div style={this.style.login}>
                    <div style={{marginBottom: "50px"}}>
                        <img id="logo" src={require('../assets/image/logo.png').default} alt="Baiyi  佰翊"/>
                    </div>
                    <div style={{backgroundColor: "#222428", padding: "20px"}}>
                        <h2 id="title" style={{color: "white"}}>眼征仪注册系统</h2>
                        <div id="login-page" style={{display: this.state.loginDisplay}}>
                            <div className="form">
                                <form className="login-form" onSubmit={this.LoginHandler}>
                                    <input
                                        type="text"
                                        placeholder="请输入用户名或手机号"
                                        name="UserName"
                                        ref="UserName"
                                        onChange={this.handleChange
                                        }
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        // value={this.state.UserName}
                                        required
                                        style={this.style.input}
                                    />
                                    <input
                                        type="password"
                                        placeholder="请输入密码"
                                        name="password"
                                        ref="password"

                                        onChange={this.handleChange
                                        }
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        // value={this.state.password}
                                        required
                                        style={this.style.input}
                                    />
                                    <button style={this.style.button}>登陆</button>
                                </form>
                                <p style={{color: "#8C8C8C"}}>
                                    点击
                                    <a style={{color: "white", cursor: "pointer"}} onClick={this.gotoSignupHandler}>
                                        注册
                                    </a>
                                </p>
                                <div>
                                    <p id="loginFeedback" style={{color: "red"}}>
                                        {this.state.loginFeedback}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div id="signup-page" style={{display: this.state.signupDisplay}}>
                            <div className="form">
                                <form className="login-form" onSubmit={this.SignupHandler}>
                                    <input
                                        type="text"
                                        placeholder="请输入用户名或手机号"
                                        name="UserNameSignup"
                                        ref="UserNameSignup"

                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        onChange={this.handleChange
                                        }
                                        value={this.state.UserNameSignup}
                                        required
                                        style={this.style.input}
                                    />
                                    <input
                                        type="password"
                                        ref="passwordSignup"

                                        placeholder="请输入密码"
                                        name="passwordSignup"
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}

                                        onChange={this.handleChange
                                        }
                                        required
                                        style={this.style.input}
                                    />
                                    <input
                                        type="password"
                                        placeholder="请重复密码"
                                        ref="confirmPassword"

                                        name="confirmPassword"
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}

                                        onChange={this.handleChange
                                        }
                                        required
                                        style={this.style.input}
                                    />
                                    <button style={this.style.button}>创建账号</button>
                                </form>
                                <p style={{color: "#8C8C8C"}}>
                                    已有账号？
                                    <a
                                        style={{color: "white", cursor: "pointer"}}
                                        onClick={this.gotoLoginHandler}
                                    >
                                        登陆
                                    </a>
                                </p>
                                <div>
                                    <p id="SignUpFeedback" style={{color: "red"}}>{this.state.signUpFeedback}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{position: 'absolute', bottom: '0px', left: '50%', transform: 'translate(-50%)', display: this.state.show ? 'block' : 'none', width: '80%'}}>
                    <Keyboard
                        style={{
                            display: 'none',
                            position: 'absolute',
                            bottom: 0,
                        }}
                        keyboardRef={r => (this.keyboard = r)}
                        preventMouseDownDefault={true}
                        onChange={input => this.onChange(input)}
                        onKeyPress={button => this.onKeyPress(button)}
                        theme={"hg-theme-default hg-layout-default myTheme"}
                        layoutName={this.state.layoutName}
                        {...layout}
                    />
                </div>
            </div>
        );
    }
}
