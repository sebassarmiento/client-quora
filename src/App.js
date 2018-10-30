import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignUp from './components/signUp';
import Feed from './components/feed';
import NavBar from './utils/NavBar';
import { connect } from 'react-redux';
import Login from './components/login';
import AddQuestion from './components/addQuestion';
import Redirect from './utils/Redirect';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.logged ?
          <BrowserRouter>
            <div>
              <NavBar />
              <Route path="/" exact component={Feed} />
              <Route path="/add-question" component={AddQuestion} />
            </div>
          </BrowserRouter> :
          <BrowserRouter>
            <div>
              <Route path="/" exact component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route component={Redirect} />
            </div>
          </BrowserRouter>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged
  }
}

export default connect(mapStateToProps)(App);
