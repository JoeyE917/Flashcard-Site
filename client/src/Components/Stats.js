import React, { Component } from 'react'
import { getScores } from '../actions/flashcardActions';
import PropTypes from "prop-types";
import store from "../store";
import { connect } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';

class Stats extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        let id = store.getState().auth.user.id;
        // Remove authorization token to avoid CORS issue
        let token = axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["Authorization"];
        // Get stats for user from database and save data in state
        axios
        .get("http://localhost:5000/api/users/getScores", { params: {
            id: id
        }})
        .then(res => {
            this.setState({ stats: res.data });
        })
        // Re add authorization token once API call finishes
        axios.defaults.headers.common["Authorization"] = token;
    }


    user = store.getState().auth.user;
    
    
    render() {
        // Return empty div if no stats for the user were found.
        if(!this.state.stats){
            return <div></div>
        }
        // Loop through each category the user has stats for, and display a "card" showing the number of
        // questions the user has answered and gotten correct in that category, and show the percent correct
        return(
            <>
                <Navbar></Navbar>
                <div className="container">
                    <div className="stats">{Object.keys(this.state.stats).map(stat => {
                            let percent = this.state.stats[stat].correct / this.state.stats[stat].answered * 100;
                            return(
                                <div className="stat-card">
                                    <span className="category">{stat}:</span><br/>
                                    <div className="correct-answered">
                                        {this.state.stats[stat].correct} correct <br/>
                                        {this.state.stats[stat].answered} answered
                                    </div>
                                    <div className="correct-percent" style={{color: percent >= 75 ? "green" : percent >= 45 ? "orange" : "red"}}>
                                        {percent.toFixed(2)}%
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                

            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.erorrs
});

export default connect(mapStateToProps, { getScores })(Stats);