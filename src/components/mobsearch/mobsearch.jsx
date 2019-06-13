import React, { Component } from "react";
import Headings from "../headings/headings";
import MenuBar from "../menu/menu";
import "./mobsearch.css";
import actions from "../../Store/Actions/Index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Button } from 'react-bootstrap';

class MobSearch extends Component {
    constructor(props) {
        super();
        this.state = {
            mobileno: ""
        };
    }

    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }

    }

    onSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.mobileno === "") {
            document.getElementById("mobileerror").innerHTML = "Mobile Number Required";
        }
        else {
            document.getElementById("mobileerror").innerHTML = "";
            this.props.searchmobile({ mobileno: this.state.mobileno }).then(() => {

                if (this.props.Mob.userdetails.didError == false) {
                    localStorage.setItem("mobilenumber", this.props.Mob.userdetails.item.mobileNbr);
                    this.props.history.push('/existingcus');
                }
                else {
                    this.props.history.push('/newentry?mobilenumber=' + this.state.mobileno);
                }

            })
            return;
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <MenuBar />

                    <div className="col-md-12 md12">
                        <div className="row">
                            <div className="col-md-6 l6" />
                            <div className="col-md-6 r6 rmob-6">
                                <Headings />
                                <div className="row">
                                    <div className="col-md-12">
                                        <Form onSubmit={this.onSubmit}>
                                            <div className="form-group f-12">
                                                <label>mobile number</label>
                                                <input
                                                    type="number"
                                                    placeholder="enter mobile number"
                                                    className="form-control"
                                                    id="mobileno"
                                                    value={this.state.mobileno}
                                                    onChange={evt => {
                                                        this.setState({ mobileno: evt.target.value });
                                                    }}
                                                />
                                                <label className="text-danger" id="mobileerror" />
                                            </div>
                                            <button
                                                className="btn btn-primary btn-block"
                                                type="submit" >
                                                search
                                              </button>
                                        </Form>
                                    </div>
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
    Mob: state.mob
});
const mapDispatchToProps = dispatch => ({
    searchmobile: v => dispatch(actions.searchmobile(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MobSearch)
);
