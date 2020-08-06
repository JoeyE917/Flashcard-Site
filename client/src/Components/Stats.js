import React, { Component } from 'react'
import { getScores } from '../actions/flashcardActions';
import PropTypes from "prop-types";
import store from "../store";
import { connect } from 'react-redux';
import axios from 'axios';

class Stats extends Component{
    constructor(props){
        super(props);
        let id = store.getState().auth.user.id;
        let token = axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["Authorization"];
        console.log(this.props.getScores({id}));
        axios.defaults.headers.common["Authorization"] = token;
    }


    user = store.getState().auth.user;
    
    
    render() {
        console.log(this.stats);
        return <div>Hey</div>
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.erorrs
});

export default connect(mapStateToProps, { getScores })(Stats);