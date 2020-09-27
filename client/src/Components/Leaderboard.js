import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import store from "../store";
import { connect } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';

export default function Leaderboard() {
    const [categories, setCategories] = useState([]);
    const categoryEl = useRef();

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

    return (
        <>
            <Navbar></Navbar>
            <form className="header">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" ref={categoryEl}>
                        {categories.map(category => {
                            return <option value={category.id} key={category.id}>{category.name}</option>
                        })}
                    </select>
                </div>
            </form>
            <div className="container">
                {categoryEl.current}
            </div>
        </>
    )
}
