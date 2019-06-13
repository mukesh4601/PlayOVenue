import React, { Component } from "react";
import actions from "../../Store/Actions/Index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Headings from "../headings/headings";
import Menu from "../menu/menu";
import "./newcustomer.css";
import { Form, Button } from 'react-bootstrap';



class NewEntry extends Component {
    constructor() {
        super();
        this.state = {
            childs: [],
            childss: [],
            clicks: 1,
            show: true,
            firstName: null,
            lastName: null,
            mobileNbr: null,
            emailAddress: null,
            name: null,
            dateOfBirth: null,
            sex: null,
            Customer: [],
        };
    }

    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let foo = params.get('mobilenumber');
        document.getElementById("mobilenumber").value = foo;
        document.getElementById("mobilenumber").disabled = true;
        this.setState({ mobileNbr: foo })
    }

    async addNewChild() {
        await this.setState(prevState => {
            return {
                childs: prevState.childs.concat({
                    name: this.state.name,
                    dateOfBirth: this.state.dateOfBirth,
                    sex: this.state.sex
                }),
            };
        });
    };


    onSubmit = async (evt) => {
        evt.preventDefault();
        await this.props.newcustomer({
            Customer: {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                MobileNbr: this.state.mobileNbr,
                EmailAddress: this.state.emailAddress,
                Childs: this.state.childs
            },
        }).then(() => {
            this.props.history.push({
                pathname: '/existingcus',
                state: {
                    allcustomerdetails: this.state.Customer,
                }
            });
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Menu />
                    <div className="row  customerpanel">
                        <div className="col-md-12 md12">
                            <div className="row">
                                <div className="col-md-12 frm">
                                    <form className="col-md-12" onSubmit={this.onSubmit}>
                                        <div className="row ">

                                            <div className="col-md-6 cusdata lnc" >
                                                <Headings />
                                                <div className="row classparents">

                                                    <div className="form-group col-md-6">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter First Name"
                                                            className="form-control"
                                                            value={this.state.firstName}
                                                            onChange={evt => {
                                                                this.setState({ firstName: evt.target.value });
                                                            }}
                                                            required />
                                                    </div>

                                                    <div className="form-group col-md-6">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Last Name"
                                                            className="form-control"
                                                            value={this.state.lastName}
                                                            onChange={evt => {
                                                                this.setState({ lastName: evt.target.value });
                                                            }}
                                                            required />

                                                    </div>

                                                    <div className="form-group col-md-6">
                                                        <label>mobile number</label>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter Number"
                                                            className="form-control"
                                                            value={this.state.mobileNbr}

                                                            required id="mobilenumber" />
                                                    </div>

                                                    <div className="form-group col-md-6">
                                                        <label>emailid</label>
                                                        <input
                                                            type="email"
                                                            placeholder="Enter Email"
                                                            className="form-control small"
                                                            value={this.state.emailAddress}
                                                            onChange={evt => {
                                                                this.setState({ emailAddress: evt.target.value });
                                                            }}
                                                            required />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label id="childerror" className="text-danger"></label>
                                                    </div>

                                                    <div className="col-md-12 justify-content-right">
                                                        <button
                                                            className="btn addchild"
                                                            type="submit">
                                                            Add Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-6 cusdata rnc">

                                                {this.state.childs.map((child, index) => {
                                                    return (
                                                        <div className="childtbl" key={index}>
                                                            <div className="row">
                                                                {/* <div className="col-md-12 childno">
                                                                    <p>Child {this.state.clicks}</p>
                                                                </div> */}

                                                                <div className="form-group col-md-4 f-12">
                                                                    <label>child name</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="enter child name"
                                                                        className="form-control"
                                                                        value={this.state.name}
                                                                        onChange={(e) => {
                                                                            let val = e.target.value
                                                                            this.setState(function (prevState) {
                                                                                prevState.childs[index].name = val;
                                                                            });
                                                                        }}
                                                                        id="nameofchild"
                                                                    />
                                                                </div>

                                                                <div className="form-group col-md-4 f-12">
                                                                    <label>date of birth</label>
                                                                    <input
                                                                        type="date"
                                                                        placeholder="enter dob"
                                                                        className="form-control"
                                                                        value={this.state.dateOfBirth}
                                                                        onChange={(e) => {
                                                                            let val = e.target.value
                                                                            this.setState(function (prevState) {
                                                                                prevState.childs[index].dateOfBirth = val;
                                                                            });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-4 f-12">
                                                                    <label>select gender</label>

                                                                    <Form.Group controlId="formBasicName">
                                                                        <Form.Control as="select" value={this.state.sex} onChange={(e) => {
                                                                            let val = e.target.value
                                                                            this.setState(function (prevState) {
                                                                                prevState.childs[index].sex = val;
                                                                            });
                                                                        }}>
                                                                            <option>Select Gender</option>
                                                                            <option>Male</option>
                                                                            <option>Female</option>
                                                                        </Form.Control>
                                                                    </Form.Group>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                <div className="row">
                                                    <div className="col-md-12 buttons">
                                                        <button type="button"
                                                            className="btn"
                                                            onClick={event => {
                                                                this.addNewChild();
                                                                // this.IncrementItem();
                                                            }}>
                                                            + add child
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

});
const mapDispatchToProps = dispatch => ({
    newcustomer: v => dispatch(actions.newcustomer(v))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(NewEntry)
);
