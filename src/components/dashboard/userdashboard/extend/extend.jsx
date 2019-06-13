import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../../Store/Actions/Index";
import { withRouter } from "react-router";
import { Form } from 'react-bootstrap';

import "./extend.css";
class extend1 extends Component {
    constructor(props) {
        super();
        this.state = {
            childname: "",
            product: "",
            productid: "",
            productname: "",
            linkedPackages: [],
            currentpackage: "",
            moneycollected: "",
            packageduration: "",
            listofproducts: sessionStorage.getItem("products"),
            productname: null,
            packagename: null,
            money: null,
            PackageID: "",
            moneyleft: "0"
        };
    }


    onSubmit = evt => {
        evt.preventDefault();
        this.props.Extend({
            activityId: this.props.extend.activityId,
            MoneyCollected: this.state.moneycollected,
            PackageID: this.state.PackageID,
            PackageDuration: this.state.packageDuration
        })
    };


    componentDidMount() {
        console.log(this.props.extend);
        let paredetails = localStorage.getItem("parentdetails");
        let result = JSON.parse(paredetails);
        let productdetail = localStorage.getItem("productdetails");
        let presult = JSON.parse(productdetail);
        this.setState({ childname: this.props.extend.childName });
        this.setState({ product: presult.productname });
        this.setState({ productid: this.props.extend.productID });
        this.setState({ productname: this.props.extend.productName });
        this.setState({ PackageID: presult.packageID });
        this.setState({ currentpackage: this.props.extend.packageName });
        this.setState({ moneycollected: this.props.extend.moneyCollected });
        this.setState({ packageduration: this.props.extend.packageDuration });
        this.setState({ money: this.props.extend.totalCost })


        let listofproducts = JSON.parse(sessionStorage.getItem("products"));
        let selectedProducts = listofproducts.find(x => x.productID === this.props.extend.productID);
        this.setState({ 'selectedProduct': this.props.extend.productID, 'linkedPackages': selectedProducts.linkedPackages })
        this.setState({ linkedPackages: selectedProducts.linkedPackages });
    }



    render() {

        return (
            <div className="row">
                <div className="col-md-12 extend">
                    <form onSubmit={this.onSubmit}>
                        <div className="f-12 ">
                            <label>child name : <strong>{this.state.childname}</strong> </label>
                        </div>
                        <div className="f-12 ">
                            <label>product Name : <strong>{this.state.productname}</strong> </label>
                        </div>
                        <div className="f-12 ">
                            <label>
                                current package : <strong>{this.state.currentpackage}</strong>
                            </label>
                        </div>

                        <div className="f-12 ">
                            <label>
                                package duration : <strong>{this.state.packageduration}</strong>
                            </label>
                        </div>



                        <div className="form-group f-12" >
                            <label>select package</label>

                            <Form.Group controlId="formBasicName">
                                <Form.Control as="select" value={this.state.money} onChange={evt => {
                                    let result = JSON.parse(evt.target.value);
                                    this.setState({
                                        packageduration: result.duration, PackageID: result.packageID, packagename: result.name,
                                        money: result.money
                                    })
                                }} >

                                    {this.state.linkedPackages && this.state.linkedPackages && this.state.linkedPackages.map((p) => {
                                        return (
                                            <option value={JSON.stringify(p)} selected >  {p.name} --
                                                                     Duration :  {p.duration} Mins --
                                                                  Money :  {p.money} </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </div>


                        <div className="f-12 ">
                            <label>
                                money collected : <strong>{this.state.moneycollected}</strong>
                            </label>
                        </div>

                        <div className="f-12">
                            <label>Money Left : <strong>{this.state.money - this.state.moneycollected}</strong></label>
                        </div>

                        <div className="f-12 ">
                            <label>
                                Total Ammount to be collected
                            </label>
                            <input
                                type="number"
                                value="0"
                                onChange={evt => {
                                    this.setState({ moneycollected: evt.target.value });
                                }}
                                placeholder="Enter Ammount to be Collected"
                                className="form-control small"
                            />
                        </div>




                        <div className="col-md-12">
                            <button variant="primary" type="submit">
                                Extend
                            </button>
                        </div>

                    </form>
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
    Extend: v => dispatch(actions.Extend(v)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(extend1)
);
