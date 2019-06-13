import { createAction } from "redux-actions";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const DASHBOARD_STATUS = createAction("DASHBOARD_STATUS");
const ACTIVITY = createAction("ACTIVITY");
const END = createAction("END");
const EXTEND = createAction("EXTEND");
export const dashboardata = values => dispatch => {
    return axios.get(
        BACKEND_URL + "api/Activity", {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            crossdomain: true
        }
    ).then(res => {
        dispatch(DASHBOARD_STATUS(res.data.items));
    })
        .catch(err => {
            return Promise.reject();
        })
};

export const activity = values => dispatch => {
    return axios.post(
        BACKEND_URL + "api/activity", {
            CustomerID: values.CustomerID,
            ActualMoneyCollected: values.ActualMoneyCollected,
            TotalPackageCost: values.TotalPackageCost,
            PaymentReference: values.PaymentReference,
            Childs: values.Childs
        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        dispatch(ACTIVITY(res.data.item));
    })
        .catch(error => {
            document.getElementById("error").innerHTML = error.response.data.errorMessage;
            return Promise.reject();
        });
};



export const end = values => dispatch => {
    console.log(values);
    return axios.post(
        BACKEND_URL + "api/Activity/end/" + values.activityId,
        {
            MoneyCollected: values.MoneyCollected,
            PackageID: values.PackageID,
            PackageDuration: values.PackageDuration,
            PaymentReference: "Some reference"
        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        alert("Ended Successfully");
        window.location.reload();
        dispatch(END());
    }).catch(error => {
        alert("Something Went Wrong");
        return Promise.reject();
    });
};



export const Extend = values => dispatch => {
    console.log(values);
    return axios.put(
        BACKEND_URL + "api/Activity/" + values.activityId,
        {
            MoneyCollected: values.MoneyCollected,
            PackageID: values.PackageID,
            PackageDuration: values.PackageDuration,
            PaymentReference: "Some reference",

        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(res => {
        alert("Extended Successfully");
        window.location.reload();
        dispatch(EXTEND());
    }).catch(error => {
        alert("Something Went Wrong");
        return Promise.reject();
    });
};







