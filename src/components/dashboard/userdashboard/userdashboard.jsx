import React, { Component } from "react";
import MenuBar from "../../menu/menu";
import { Tabs, Tab } from 'react-bootstrap'
import SafeZone from "../userdashboard/safezone/safezone";
import AmberZone from "../userdashboard/amberzone/amberzone";
import DangerZone from "../userdashboard/dangerzone/dangerzone";
import { connect } from "react-redux";
import actions from "../../../Store/Actions/Index";
import { withRouter } from "react-router";
import { Router, Route, Link } from 'react-router-dom'
import "./userdashboard.css"

import "./userdashboard.css";

const _ = require('lodash');
class UserDashboard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'safezone',
            mobilenumber: null,
            child: [],
            childname: null,
            mobno: null,
            rfid: null,
        };

        this.safeZoneMarkup = this.safeZoneMarkup.bind(this);
        this.getAmberzoneMarkup = this.getAmberzoneMarkup.bind(this);
        this.getDangerzoneMarkup = this.getDangerzoneMarkup.bind(this);
    }

    async componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }


        await this.props.dashboardata();
        await this.props.allproducts();
        let allproducts = [];
        let allpackages = [];
        for (var i = 0; i < allproducts; i++) {

        }
        for (var j = 0; j < allpackages; j++) {
        }
        sessionStorage.setItem("products", JSON.stringify(this.props.products.products.items));
        let result = sessionStorage.getItem("items");
    }



    safeZoneMarkup() {
        let t = [];
        this.props.itemss.zone.map((zone, index) => {
            if (zone.status == 0) {
                t.push(<SafeZone data={zone} />);
            }
        })
        return t;
    };

    getAmberzoneMarkup() {
        let t = [];
        this.props.itemss.zone.map((zone, index) => {
            if (zone.status == 1) {
                t.push(<AmberZone data={zone} />);
            }
        })
        return t;
    }

    getDangerzoneMarkup() {
        let t = [];
        this.props.itemss.zone.map((zone, index) => {
            if (zone.status == 2) {
                t.push(<DangerZone data={zone} />);
            }
        })
        return t;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <MenuBar />
                </div>

                <div className="col-md-12 userboard">
                    <Link className="adduer" to="/mobsearch"><i class="fa fa-user-plus" aria-hidden="true" ></i></Link>
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })} className="tabs" >
                        <Tab eventKey="safezone" title="safezone" className="safe">
                            <div className="row">
                                <div className="col-md-12 safe1">
                                    <div className="row">
                                        {this.safeZoneMarkup()}
                                    </div></div></div>
                        </Tab>
                        <Tab eventKey="amberzone" title="amberzone" className="amber">
                            <div className="row">
                                <div className="col-md-12 safe1">
                                    <div className="row">
                                        {this.getAmberzoneMarkup()}
                                    </div></div></div>
                        </Tab>
                        <Tab eventKey="dangerzone" title="dangerzone" className="danger">
                            <div className="row">
                                <div className="col-md-12 safe1">
                                    <div className="row">
                                        {this.getDangerzoneMarkup()}
                                    </div></div></div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        itemss: state.zone,
        products: state.allproducts
    }
}

const mapDispatchToProps = dispatch => ({
    dashboardata: (v) => dispatch(actions.dashboardata(v)),
    allproducts: (v) => dispatch(actions.allproducts(v)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDashboard));


