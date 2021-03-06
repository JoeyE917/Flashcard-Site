import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import Quiz from './Quiz'
import axios from 'axios';
import Navbar from './Navbar';
import store from '../store';


function Landing() {
    const [flashcards, setFlashcards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [quizMode, setQuizMode] = useState(false);
  
    const categoryEl = useRef();
    const amountEl = useRef(); 

    // Get trivia categories from opentdb API
    useEffect(() => {
      // Clear authorization token to avoid CORS issue -- re add afterwards
      let token = axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["Authorization"];
      axios.get('https://opentdb.com/api_category.php').then(res => {
        // Set categories to data retrieved from API call
        setCategories(res.data.trivia_categories);
      })
      axios.defaults.headers.common["Authorization"] = token;
    }, [])
    
    function sanitizeString(str){
      const textArea = document.createElement('textarea');
      textArea.innerHTML = str;
      return textArea.value; 
    }
  
    // 
    function handleSubmit(e){
      e.preventDefault();
      genFlashcards();
      setQuizMode(false);
    }
  
    function handleAlternate(e) {
      e.preventDefault();
      genFlashcards();
      setQuizMode(true);
    }
  
  
    function genFlashcards(){
      // Store the authorization header that axios is currently using
      let token = axios.defaults.headers.common["Authorization"];
      // Delete the authorization header to allow the API call to opentdb
      delete axios.defaults.headers.common["Authorization"];

      // Sends get request to opentdb API, passing in the selected category and amount as parameters
      axios.get('https://opentdb.com/api.php?amount=10', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        // Sanitize results, create flashcard object, and set flashcards list equal to result
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = sanitizeString(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => sanitizeString(a)), answer];
          return {
            id: `${index}-${Date.now()}`,
            question: sanitizeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5),
            category: questionItem.category
          }
        }))
      })
      // Re add authorization token
      axios.defaults.headers.common["Authorization"] = token;
    }
  
    return (
      // Form to select category, # of questions, and flashcard or quiz mode
      <>
        <Navbar></Navbar>
        <form className="header" onSubmit={handleSubmit}>
          <div className = "form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
              {categories.map(category => {
                return <option value={category.id} key={category.id}>{category.name}</option>
              })}
          </select>
          </div>
          <div className = "form-group">
              <label htmlFor="amount">Number Of Questions</label>
              <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl}/>
          </div>
          <div className = "form-group">
              <button type="submit" className="generate-button">Flashcards</button>
          </div>
          <div className = "form-group">
              <button onClick={handleAlternate} className="quiz-button">Quiz</button>
          </div>
        </form>
        {quizMode
        ?
          <div className="container">
            <Quiz flashcard={flashcards}/>
          </div>
        :
          <div className="container">
            <FlashcardList flashcards={flashcards} />
          </div>
        }
      </>
    );
  }
export default Landing;