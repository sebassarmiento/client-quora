import React, { Component } from 'react';
import Loader from '../utils/loader';
import Question from '../utils/Question';
import '../css/feed.css';
import Moment from 'moment';
import Categories from '../utils/Categories';

class Feed extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/questions')
      .then(d => d.json())
      .then(data => {
        this.setState({ data: data })
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  render() {

    const showData = this.state.data ? this.state.data.map(q => <Question category={q.category} info={q.info} date={q.date} username={q.username} question={q.question} />) : null

    return (
      <div className="feed-main-container" >
        <Categories />
        <div className="feed-questions-container" >
          {this.state.data ? showData : <Loader />}
        </div>
        <div className="feed-third-container" >
          <h1>Hello</h1>
        </div>
      </div>
    )
  }
}

export default Feed;