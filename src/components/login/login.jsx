import React, { Component } from "react";
import Headings from "../headings/headings";
import "./login.css";

import { connect } from "react-redux";
import actions from "../../Store/Actions/Index";
import { withRouter } from "react-router";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            RequestedAt: "",
            date: ""
        };
    }

    onSubmit = evt => {
        evt.preventDefault();
        if (this.state.username === "") {
            document.getElementById("usernamerror").innerHTML = "Email Required";
            document.getElementById("username").style.borderColor = "red";
        } else if (this.state.password === "") {
            document.getElementById("usernamerror").innerHTML = "";
            document.getElementById("passworderror").innerHTML = "Password Required";
            document.getElementById("password").style.borderColor = "red";
        } else {
            document.getElementById("usernamerror").innerHTML = "";
            document.getElementById("passworderror").innerHTML = "";
            this.props.verifyUser({
                username: this.state.username,
                password: this.state.password,
                RequestedAt: this.state.RequestedAt
            }).then(() => {
                this.props.history.push('/userdashboard');
                return;
            })
            return;
        }
    };

    async componentDidMount() {
        var today = new Date();
        var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        document.getElementById("RequestedAt").value = date;

        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
        else {
            this.props.history.push({
                pathname: '/userdashboard',
            });
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12 login">
                    <div className="row">
                        <div className="col-md-6 l6" />
                        <div className="col-md-6 r6">
                            <Headings />
                            <div className="row">
                                <div className="col-md-10">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group f-12">
                                            <label>User Name</label>
                                            <input
                                                type="text"
                                                value={this.state.username}
                                                onChange={evt => {
                                                    this.setState({ username: evt.target.value });
                                                }}
                                                placeholder="Enter Username"
                                                className="form-control small"
                                                id="username"
                                            />
                                            <label className="text-danger" id="usernamerror" />
                                        </div>
                                        <div className="form-group f-12">
                                            <label>password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter Password"
                                                className="form-control small"
                                                value={this.state.password}
                                                onChange={evt => {
                                                    this.setState({ password: evt.target.value });
                                                }}
                                                id="password"
                                            />
                                            <label className="text-danger" id="passworderror" />
                                        </div>
                                        <div className="form-group  datehide f-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.RequestedAt}
                                                onChange={evt => {
                                                    this.setState({ RequestedAt: evt.target.value });
                                                }}
                                                id="RequestedAt"
                                                disabled
                                            />

                                            {/* <label className="text-danger" id="passworderror"></label> */}
                                        </div>
                                        <p id="emailerror" className="text-danger" />
                                        <button className="btn btn-block" type="submit">
                                            login
                                        </button>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.Auth
});
const mapDispatchToProps = dispatch => ({
    verifyUser: v => dispatch(actions.verifyUser(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);
