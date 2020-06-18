import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import Quiz from './Quiz'
import './app.css';
import axios from 'axios';
import { button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quizMode, setQuizMode] = useState(false);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then(res => {
      setCategories(res.data.trivia_categories);
    })
  }, [])

  useEffect(()=>{
    
  }, [])

  function sanitizeString(str){
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value; 
  }

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
    axios.get('https://opentdb.com/api.php?amount=10', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = sanitizeString(questionItem.correct_answer);
        const options = [...questionItem.incorrect_answers.map(a => sanitizeString(a)), answer];
        return {
          id: `${index}-${Date.now()}`,
          question: sanitizeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  return (
    <>
        <Navbar>
          <Navbar.Brand href="#home">Flashcards</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
        <Quiz flashcards={flashcards} />
      </div>
      :
        <div className="container">
          <FlashcardList flashcards={flashcards} />
        </div>
      }
    </>
  );
}

export default App;
