import React, { Component } from 'react';
import '../css/utils/question.css';
import timeAgo from '../utils/timeAgo';

class Question extends Component {
  render() {
    return (
      <div className="question-container" >
        <p className="question-category" >{this.props.category}<span className="question-date" >{timeAgo(Date.now(), this.props.date)}</span></p>
        <p className="question-title" >{this.props.question}</p>
        <p className="question-info" >{this.props.info}</p>
        <p className="question-username" >- {this.props.username}</p>
      </div>
    )
  }
}

export default Question;