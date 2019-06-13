import React, { Component } from "react";
import Headings from "../headings/headings";
import MenuBar from "../menu/menu";
import "./eventselection.css";
import { Form } from 'react-bootstrap';

import actions from "../../Store/Actions/Index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { transform } from "@babel/core";
class EventSelection extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            childname: null,
            money: null,
            selectedProduct: null,
            linkedPackages: [],
            packageduration: null,
            packageID: null,
            ProductID: null,
            summary: null,
            array: null,
            listofproducts: sessionStorage.getItem("products"),
            productname: null,
            packagename: null,
            rfidId: null
        };
    }

    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }
        // await this.props.allproducts();
        let allproducts = [];
        let allpackages = [];
        for (var i = 0; i < allproducts; i++) {

        }
        for (var j = 0; j < allpackages; j++) {
        }
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let foo = params.get('childname');
        this.setState({ childname: foo });


    }

    onformsubmit = (evt) => {
        debugger
        evt.preventDefault();
        let packagedetails = ({
            packageduration: this.state.packageduration,
            packageID: this.state.packageID,
            ProductID: this.state.ProductID,
            money: this.state.money,
            productname: this.state.productname,
            packagename: this.state.packagename,
            rfidId: this.state.rfidId

        })
        localStorage.setItem("productdetails", JSON.stringify(packagedetails));
        this.props.history.push({
            pathname: '/summary',
        });
    }


    _handelkeydown = function (e) {
        if (e.key === 'Enter') {
            alert("hy");
        }
    }

    render() {
        let AllListofProducts = JSON.parse(this.state.listofproducts);
        return (
            <div className="row" >
                <div className="col-md-12">
                    <MenuBar />
                    <div className="row">
                        <div className="col-md-6 l-md-6" />
                        <div className="col-md-6 r-md-6">
                            <Headings />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="evenrform">
                                        <form onSubmit={this.onformsubmit.bind(this)}>
                                            <div className="f-12">
                                                <label>child name : <span className="capital"> {this.state.childname} </span></label>
                                            </div>
                                            <div className="form-group f-12">
                                                <label>select product</label>

                                                <Form.Group controlId="formBasicName">
                                                    <Form.Control as="select" value={this.state.firstName}
                                                        onChange={(evt) => {
                                                            let productresult = JSON.parse(evt.target.value);
                                                            let timeDependentFlag = productresult.timeDependentFlag;
                                                            document.getElementById("packagesselect").style.display = "block";
                                                            if (timeDependentFlag === true) {
                                                                document.getElementById("RFIDBOX").style.display = "block"
                                                            }
                                                            else if (timeDependentFlag === false) {
                                                                document.getElementById("RFIDBOX").style.display = "none"
                                                            }
                                                            let product = AllListofProducts.filter((p) => p.productID == productresult.productID);
                                                            let packages = product[0].linkedPackages || [];
                                                            this.setState({ 'selectedProduct': evt.target.value, 'linkedPackages': packages, ProductID: productresult.productID, productname: productresult.name })
                                                        }} >
                                                        <option>Select Product</option>

                                                        {AllListofProducts && AllListofProducts && AllListofProducts.map((allproducts, index) => (
                                                            <option value={JSON.stringify(allproducts)}    > {allproducts.name}   ( {allproducts.description}  )</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>

                                            </div>

                                            <div className="form-group f-12" id="packagesselect" style={{ display: "none" }}>
                                                <label>select package</label>

                                                <Form.Group controlId="formBasicName">
                                                    <Form.Control as="select" id="money" value={this.state.money} onChange={evt => {
                                                        let result = JSON.parse(evt.target.value);
                                                        this.setState({ money: result.money, packageduration: result.duration, packageID: result.packageID, packagename: result.name })
                                                    }} >
                                                        {this.state.linkedPackages.map((p) => {
                                                            return (
                                                                <option value={JSON.stringify(p)} >   Package Name :  {p.name} --
                                                                    Package Duration :  {p.duration} Mins --
                                                                    Total Money :  {p.money} </option>
                                                            )
                                                        })}
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            <div className="f-12" id="RFIDBOX" style={{ display: "none" }}>
                                                <label>RFID</label>
                                                <input
                                                    type="text"
                                                    placeholder="enter rfid"
                                                    className="form-control"
                                                    value={this.state.rfidId}
                                                    onChange={evt => {
                                                        this.setState({ rfidId: evt.target.value });
                                                    }}
                                                    onKeyPress={(event) => {
                                                        if (event.charCode === 13) {
                                                            event.preventDefault();
                                                            return false;
                                                        }
                                                    }}
                                                    required />
                                            </div>
                                            <div className="f-12">
                                                <label> Money : {this.state.money}</label>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 buttons">
                                                    <div className="row">
                                                        <div className="col-md-6 text-left">
                                                            <button className="btn btn-block" >Next</button>
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
            </div>
        );
    }
}



const mapStateToProps = state => ({
    products: state.allproducts,
    details: state.newuser
});
const mapDispatchToProps = dispatch => ({
    allproducts: (v) => dispatch(actions.allproducts(v)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EventSelection)
);