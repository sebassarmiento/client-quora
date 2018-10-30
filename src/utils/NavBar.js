import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleLogout(){
    this.props.logout()
  }

  render() {
    return (
      <div className="navbar">
        <a className="navbar-brand" >Quora</a>
        <input className="navbar-search" type="text" placeholder="Search..." />
        <div className="navbar-menu" >
          <NavLink to="/" >Feed</NavLink>
          <NavLink className="add-question-btn" to="/add-question" >Add question</NavLink>
        </div>
        <div className="navbar-user-info" >
            <img height="28px" src="http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png" alt="user-image" />
            <div>{this.props.username}</div>
            <img className="logout-btn" onClick={() => this.handleLogout()} src="https://png.icons8.com/ios/1600/logout-rounded-filled.png" height={24} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({type: 'LOGOUT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);