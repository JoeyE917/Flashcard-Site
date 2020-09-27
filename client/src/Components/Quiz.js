import React, { Component } from 'react'
import { updateScore } from '../actions/flashcardActions';
import PropTypes from "prop-types";
import store from "../store";
import { connect } from 'react-redux';
import axios from 'axios';

class Quiz extends Component{
    constructor(props){
        super(props);
        this.flashcards = props.flashcard;
        this.numCorrect = 0;
        this.numAnswered = 0;
        this.state = {flashcard: this.flashcards[0], errors: {}};
        if(this.state.flashcard != null){
            this.category = this.state.flashcard.category;
        }
    }
    setFlashcard(card){
        this.setState({
            flashcard: card
        })
    }


    render(){
        if(this.numAnswered >= this.flashcards.length){
            let id = store.getState().auth.user.id;
            if(id && this.numAnswered > 0){
                let token = axios.defaults.headers.common["Authorization"];
                delete axios.defaults.headers.common["Authorization"];
                this.props.updateScore({id, correct: this.numCorrect, answered: this.numAnswered, category: this.category});
                axios.defaults.headers.common["Authorization"] = token;
            }
            return <div className="postgame">You got {this.numCorrect} out of {this.numAnswered} correct!</div>
        }
        this.correctAnswer = this.state.flashcard.options.indexOf(this.state.flashcard.answer);

        return(
            <div>
                <div className="question">{this.state.flashcard.question}</div>
                <div className="quiz-options">
                    {this.state.flashcard.options.map((option, index)=>{
                                return <button onClick={() => this.checkAnswer(index)} id={"q" + index} className="quiz-option" key={option}><p>{option}</p></button>
                    })}
                </div>
            </div>
        )
     }

    checkAnswer(index){
        if(index === this.correctAnswer){
            this.numCorrect++;
        }
        this.numAnswered++;
        this.setFlashcard(this.flashcards[this.numAnswered]);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.erorrs
});

export default connect(mapStateToProps, { updateScore })(Quiz);