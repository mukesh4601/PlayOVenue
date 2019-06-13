import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const VERIFY_USER = createAction("VERIFY_USER");

export const verifyUser = values => dispatch => {
    return axios
        .post(BACKEND_URL + "api/token", {
            username: values.username,
            password: values.password,
            RequestedAt: values.RequestedAt,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            crossdomain: true
        })
        .then(res => {
            if (res.data.role === "Admin") {
                alert("You are not Authorised to Login");
            }
            else {
                localStorage.setItem("token", "Bearer " + res.data.token);
                dispatch(VERIFY_USER());
            }
        })
        .catch(error => {
            document.getElementById("emailerror").innerHTML =
                error.response.data.errorMessage;
            return Promise.reject();
        });
};


