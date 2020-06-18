import React from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }){
    const currCard = flashcards[0];
    if(currCard == null){
        return null;
    }
    return(
        <div>
            <div className="question">{currCard.question}</div>
            <div className="quiz-options">
                {currCard.options.map((option, index)=>{
                            return <div id={"q" + index} className="quiz-option" key={option}>{option}</div>
                })}
            </div>
        </div>
    )
}