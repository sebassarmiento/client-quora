import React, { Component } from 'react';
import '../css/addQuestion.css';
import Loader from '../utils/loader';
import { connect } from 'react-redux';

class AddQuestion extends Component {
  constructor() {
    super()
    this.state = {
      question: '',
      info: ''
    }
    this.category = React.createRef()
  }

  handleAddQuestion() {
    console.log(this.category.current.options[this.category.current.selectedIndex].value)
    this.setState({ addQuestionPending: true, questionAdded: false })
    fetch('http://localhost:3000/questions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      method: 'POST',
      body: JSON.stringify({
        question: this.state.question,
        info: this.state.info,
        category: this.category.current.options[this.category.current.selectedIndex].value,
        username: this.props.username
      })
    })
      .then(d => d.json())
      .then(res => {
        console.log(res)
        this.setState({ addQuestionPending: false, question: '', info: '' })
        if(res.message === 'Question was added!'){
          this.setState({questionAdded: true})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="add-question-container" >
        <h1>Add a new question</h1>
        <input className="add-question-input" name="question" onChange={(e) => this.handleChange(e)} value={this.state.question} ref={this.questionInput} type="text" />
        <h4>Choose a category:</h4>
        <select ref={this.category} >
          <option>Physics</option>
          <option>Computer Science</option>
          <option>Self-Improvement</option>
          <option>Literature</option>
          <option>Medicine</option>
          <option>Sports</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Law</option>
          <option>Art</option>
          <option>College</option>
          <option>Entrepeneurship</option>
          <option>Sex</option>
        </select>
        <h3>Additional Info:</h3>
        <input name="info" onChange={(e) => this.handleChange(e)} value={this.state.info} ref={this.infoInput} type="text" />
        {
          this.state.addQuestionPending ? <Loader /> : null
        }
        {
          this.state.question.length > 3 ? <button onClick={() => this.handleAddQuestion()} className="add-form-question-btn" >Add</button> : <button className="add-form-question-btn-disabled" >Add</button>
        }
        {
          this.state.questionAdded ? <p className="success-text" >Question was added successfully!</p> : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    token: state.token
  }
}

export default connect(mapStateToProps)(AddQuestion);