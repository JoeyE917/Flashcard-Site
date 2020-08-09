import React, { Component } from 'react'
import { getScores } from '../actions/flashcardActions';
import PropTypes from "prop-types";
import store from "../store";
import { connect } from 'react-redux';
import axios from 'axios';
import { render } from '@testing-library/react';
import Navbar from './Navbar';

class Stats extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        let id = store.getState().auth.user.id;
        let token = axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["Authorization"];
        axios
        .get("http://localhost:5000/api/users/getScores", { params: {
            id: id
        }})
        .then(res => {
            this.setState({ stats: res.data });
        })
        axios.defaults.headers.common["Authorization"] = token;
    }


    user = store.getState().auth.user;
    
    
    render() {
        if(!this.state.stats){
            return <div></div>
        }
        return(
            <>
                <Navbar></Navbar>
                <div>{Object.keys(this.state.stats).map(stat => {
                    return <div>{stat}: {this.state.stats[stat].correct} / {this.state.stats[stat].answered}</div>
                    })}
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