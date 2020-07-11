import React, { useState, useEffect, useRef } from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }){
    const [flashcard, setFlashcard] = useState(flashcards[0]);
    const [numCorrect, setNumCorrect] = useState(0);
    const [numAnswered, setNumAnswered] = useState(0);
    const questionEl = useRef();

    if(flashcard == null){
        return null;
    }
    var correctAnswer = flashcard.options.indexOf(flashcard.answer);

    if(numAnswered >= flashcards.length){
        return <div class="postgame">You got {numCorrect} out of {numAnswered} correct!</div>
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