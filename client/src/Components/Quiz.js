import React, { useState, useEffect, useRef } from 'react'
import Flashcard from './Flashcard';
import { updateScore } from '../actions/flashcardActions';
import store from "../store";

export default function FlashcardList({ flashcards, props }){
    const [flashcard, setFlashcard] = useState(flashcards[0]);
    const [numCorrect, setNumCorrect] = useState(0);
    const [numAnswered, setNumAnswered] = useState(0);

    if(flashcard == null){
        return null;
    }
    var correctAnswer = flashcard.options.indexOf(flashcard.answer);
    var category = flashcard.category;

    if(numAnswered >= flashcards.length){
        let user = store.getState().auth.user.email;
        updateScore({user, data: {correct: numCorrect, answered: numAnswered, category: category}});
        return <div className="postgame">You got {numCorrect} out of {numAnswered} correct!</div>
    }
    return(
        <div>
            <div className="question">{flashcard.question}</div>
            <div className="quiz-options">
                {flashcard.options.map((option, index)=>{
                            return <button onClick={() => checkAnswer(index)} id={"q" + index} className="quiz-option" key={option}><p>{option}</p></button>
                })}
            </div>
        </div>
    )

    function checkAnswer(index){
        if(index == correctAnswer){
            setNumCorrect(numCorrect + 1);
        }
        setNumAnswered(numAnswered + 1);
        setFlashcard(flashcards[numAnswered]);
    }

    
}