import React, { Component } from "react";
import Headings from "../headings/headings";
import MenuBar from "../menu/menu";
import actions from "../../Store/Actions/Index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./existingcustomer.css";


class ExistingCus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentprofile: " customer profile ",
            firstname: null,
            lastname: null,
            mobileno: null,
            emailid: null,
            childprofile: " child profile ",
            name: null,
            dob: null,
            age: null,
            gender: null,
            action: null,
        };
    }

    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
        await this.props.searchemobile();
        this.setState({ firstName: this.props.newuser.userdetails.item.firstName });
        this.setState({ lastname: this.props.newuser.userdetails.item.lastName });
        this.setState({ mobileno: this.props.newuser.userdetails.item.mobileNbr });
        this.setState({ emailid: this.props.newuser.userdetails.item.emailAddress });

        let alluser = [];
        for (var i = 0; i < alluser; i++) {
            this.setState({ name: this.props.newuser.userdetails.item.childs[i].name });
            this.setState({ dob: this.props.newuser.userdetails.item.childs[i].dateOfBirth });
            this.setState({ gender: this.props.newuser.userdetails.item.childs[i].sex });
        }
    }


    onsubmit = (alluser) => {
        let details = ({
            customerID: this.props.newuser.userdetails.item.customerId,
            mobilenumber: this.props.newuser.userdetails.item.mobileNbr,
            childId: alluser.customerChildID,
            childName: alluser.name,
            parentfirstname: this.state.firstName,
            parentlastname: this.state.lastname,
        })
        localStorage.setItem("parentdetails", JSON.stringify(details));
        this.props.history.push({
            pathname: '/eventselection',
            search: "?childname=" + alluser.name,
        });
    };


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <MenuBar />
                </div>

                <div className="col-md-12 ch12">
                    <div className="row">

                        <div className="col-md-6 l-md-6" />
                        <div className="col-md-6 r-md-6">
                            <Headings />

                            <div className="row">
                                <div className="col-md-12 profilecontent">
                                    <h2>{this.state.parentprofile}</h2>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>first name</th>
                                                <th>last name</th>
                                                <th>mobile no</th>
                                                <th>emailid</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.firstName}</td>
                                                <td>{this.state.lastname}</td>
                                                <td>{this.state.mobileno}</td>
                                                <td>{this.state.emailid}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12 profilecontent">
                                    <h2>{this.state.childprofile}</h2>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>name</th>
                                                <th>date of birth</th>
                                                <th>gender</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        {this.props.newuser.userdetails.item && this.props.newuser.userdetails.item.childs && this.props.newuser.userdetails.item.childs.map((alluser, index) => (
                                            <tbody>
                                                <tr>
                                                    <td>{alluser.name}</td>
                                                    <td>{alluser.dateOfBirth}</td>
                                                    <td>{alluser.sex ? "Female" : "Male"}</td>
                                                    <td>
                                                        <a href="#" onClick={(evt) => this.onsubmit(alluser)}>
                                                            <i class="fa fa-arrow-right" aria-hidden="true"></i> Book Packages
                                                        </a>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>

                                <div className="col-md-12 buttons">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <a href="/mobsearch"><button className="btn btn-block">Back</button></a>
                                        </div>

                                        <div className="col-md-6">
                                            <a href="/userdashboard"><button className="btn btn-block">Cancel</button></a>
                                        </div>

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
    newuser: state.mob
});
const mapDispatchToProps = dispatch => ({
    searchemobile: (v) => dispatch(actions.searchemobile(v)),
    details: (v) => dispatch(actions.details(v)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ExistingCus)
);