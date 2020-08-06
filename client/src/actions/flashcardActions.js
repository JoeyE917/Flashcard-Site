import axios from "axios";
import { GET_ERRORS } from "./types";

const proxy = "http://localhost:5000";

export const updateScore = data => dispatch => {
    axios
    .post(proxy + "/api/users/updateScore", data)
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    );
}

export const getScores = data => dispatch => {
    axios
    .post(proxy + "/api/users/getScores", data)
    .then(res => {
      dispatch(res);  
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    );
}