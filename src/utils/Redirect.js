import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class MyRedirect extends Component {
    constructor(){
        super()
        this.state = {}
    }
    componentDidMount(){
        this.setState({redirect: true})
    }
  render() {
    return (
      <div>
          {
              this.state.redirect ? <Redirect to="/" /> : null
          }
      </div>
    )
  }
}


export default MyRedirect;