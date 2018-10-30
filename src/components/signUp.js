import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/login.css';
import { connect } from 'react-redux';
import Loader from '../utils/loader';

class SignUp extends Component {
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

    handleSignUp() {
        this.setState({ trySignUp: true })
        fetch('http://localhost:3000/user/signup', {
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
                this.setState({ trySignUp: false })
                if (res.message === "Created user successfully") {
                    this.props.signUp(res.user.email)
                }
                if (res.message === 'Email is already taken') {
                    this.setState({ emailTaken: true })
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="login-container" >
                <div className="login-title-container" >
                    <img height="32px" src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-up-icon.png" />
                    <span className="login-text-title" >Register</span>
                </div>
                <div className="inputs-login-container">
                    <input value={this.state.username} name="username" onChange={(e) => this.handleInputChange(e)} className="login-input" placeholder="Email adress" type="text" />
                    <input value={this.state.password} name="password" onChange={(e) => this.handleInputChange(e)} className="login-input" placeholder="Password" type="password" />
                </div>
                {
                    this.state.trySignUp ? <Loader /> : <Loader hidden={true} />
                }
                {
                    this.state.emailTaken ? <p className="email-taken" >Email is already taken</p> : <p className="email-taken hidden" >Email is already taken</p>
                }
                {
                    this.state.username.length > 2 && this.state.username.length > 2 ? <button onClick={() => this.handleSignUp()} className="login-button" >Sign up</button> : <button className="disabled-btn" >Sign up</button>
                }
                <p className="link-to-signup" >Already have an account? <NavLink to="/" >Log in</NavLink></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (username, token) => dispatch({ type: 'SIGN_UP_SUCCESS', payload: { username } })
    }
}

export default connect(null, mapDispatchToProps)(SignUp);