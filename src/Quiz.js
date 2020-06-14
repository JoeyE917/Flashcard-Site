import React from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }){
    const currCard = flashcards[0];
    if(currCard == null){
        return null;
    }
    return(
        <div className="card-grid">
            <Flashcard flashcard={currCard} key={currCard.id} />
        </div>
    )
}