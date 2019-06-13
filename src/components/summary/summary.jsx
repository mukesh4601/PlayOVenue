import React, { Component } from "react";
import Headings from "../headings/headings";
import MenuBar from "../menu/menu";
import "./summary.css";
class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentname: "rajinder kumar",
            firstchildname: "Priyanka",
            productname: "1234567890",
            packagename: "1234567890",
            childprofile: " child profile ",
            secondchilname: "Priyanka",
            productname: "1234567890",
            packagename: "1234567890",
            parentlastname: ""
        };
        console.log(this.props.location);
    }
    async  componentDidMount() {
        localStorage.getItem("parentdetails", "productdetails");
        let paredetails = localStorage.getItem("parentdetails");
        let result = JSON.parse(paredetails);
        let productdetail = localStorage.getItem("productdetails");
        let presult = JSON.parse(productdetail);
        this.setState({ parentname: result.parentfirstname })
        this.setState({ firstchildname: result.parentlastname })
        this.setState({ parentlastname: result.childName })
        this.setState({ productname: presult.productname })
        this.setState({ packagename: presult.packagename })
    }

    onsubmit = (alluser) => {
        this.props.history.push({
            pathname: '/coupon',
        });
    };



    render() {
        return (
            <div className="row">
                <div className="col-md-12 panel">
                    <MenuBar />
                    <div className="row">
                        <div className="col-md-6 l-md-6" />
                        <div className="col-md-6 r-md-6">
                            <Headings />
                            <div className="row">
                                <div className="col-md-12 summarylist">
                                    <h2>Summary</h2>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <ul>
                                                        <li>parent name :</li>
                                                        <li>first child name :</li>
                                                        <li>product name :</li>
                                                        <li>package name :</li>

                                                    </ul>
                                                </div>
                                                <div className="col-md-6">
                                                    <ul>
                                                        <li>{this.state.parentname} {this.state.parentlastname}  </li>
                                                        <li>{this.state.firstchildname}</li>
                                                        <li>{this.state.productname}</li>
                                                        <li>{this.state.packagename}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 buttons">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <a href="/eventselection"><button className="btn btn-block">Back</button></a>
                                        </div>

                                        <div className="col-md-6">
                                            <a href="/coupon"><button className="btn btn-block">Confirm</button></a>
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

export default Summary;
