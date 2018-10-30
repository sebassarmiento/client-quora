import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/login.css';
import { connect } from 'react-redux';
import Loader from '../utils/loader';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin() {
        this.setState({ tryLogin: true, authFailed: false })
        fetch('http://localhost:3000/user/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password
            })
        })
            .then(d => d.json())
            .then(res => {
                console.log(res)
                if (res.message === 'Auth failed') {
                    this.setState({ authFailed: true, tryLogin: false })
                }
                if (res.token) {
                    this.props.logIn(this.state.username, res.token)
                }
            })
            .catch(err => {
                console.log("ERROR", err)
            })
    }

    render() {
        return (
            <div className="login-container" >
                <div className="login-title-container" >
                    <img alt="lock-logo" height="32px" src="https://image.flaticon.com/icons/svg/272/272354.svg" />
                    <span className="login-text-title" >Login</span>
                </div>
                <div className="inputs-login-container" >
                    <input placeholder="Username" value={this.state.username} name="username" onChange={(e) => this.handleInputChange(e)} className="login-input" type="text" />
                    <input placeholder="Password" value={this.state.password} name="password" onChange={(e) => this.handleInputChange(e)} className="login-input" type="password" />
                </div>

                <div height="64px" >
                    {this.state.tryLogin ? <Loader /> : <Loader hidden={true} />}
                    {
                        this.state.authFailed ? <p className="invalid-login-data" >Invalid username or password</p> : <p className="invalid-login-data hidden" >Invalid username or password</p>
                    }
                </div>

                {
                    this.state.username.length > 1 && this.state.password.length > 1 ? <button className="login-button" onClick={() => this.handleLogin()} >Login</button> : <button className="disabled-btn" >Login</button>
                }
                <p className="link-to-signup" >Dont have an account? <NavLink to="/signup" >Sign up</NavLink></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (username, token) => dispatch({ type: 'LOGIN_SUCCESS', payload: { token, username } })
    }
}

export default connect(null, mapDispatchToProps)(Login);