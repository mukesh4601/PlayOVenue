import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const SEARCH_MOBILE = createAction("SEARCH_MOBILE");
const SEARCHE_MOBILE = createAction("SEARCHE_MOBILE");

export const searchmobile = values => dispatch => {
    return axios.get(
        BACKEND_URL + "api/customer?SearchCriteria=0&SearchTerm=" + values.mobileno, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        dispatch(SEARCH_MOBILE(res.data));      
    }).catch
    (err=> {
      
    })
};



export const searchemobile = values => dispatch => {
    return axios.get(
        BACKEND_URL + "api/customer?SearchCriteria=0&SearchTerm=" + localStorage.getItem("mobilenumber"), {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        dispatch(SEARCHE_MOBILE(res.data));       
    })
};

