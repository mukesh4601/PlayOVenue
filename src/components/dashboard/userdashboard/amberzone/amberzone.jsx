import React, { Component } from "react";
import Extend from "../extend/extend";
import End from "../end/end";
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import "./amberzone.css";

import { connect } from "react-redux";
import actions from "../../../../Store/Actions/Index";
import { withRouter } from "react-router";

class AmberZone extends Component {
    constructor(props) {
        super();
        this.state = {
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow1 = this.handleShow1.bind(this);
        this.handleClose1 = this.handleClose1.bind(this);
    }
    componentDidMount() {
        this.showtime();
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose1() {
        this.setState({ show1: false });
    }

    handleShow1() {
        this.setState({ show1: true });
    }
    showtime() {
        if (this.props.data.timeLeft > 0) {
            document.getElementById("timeleft").hasclass = "text-danger"
        }
    }


    render() {
        return (
            <div className="col-md-3 pd12">
                <div className="row chld">
                    <div className="col-md-12">
                        <p>name : <span> {this.props.data.childName} </span></p>
                        <p>mobileno : <span> {this.props.data.mobileNbr} </span></p>
                        <p>RFID : <span> {this.props.data.rfidId} </span></p>
                        <p>Time Left : <span id="timeleft"> {this.props.data.timeLeft} </span></p>
                    </div>

                    <div className="col-md-12 butn2">
                        <div className="row">
                            <div className="col-md-6 btn-1">
                                <Button className="btn btn-block" onClick={this.handleShow1}>
                                    end
                                </Button>
                                <Modal show1={this.state.show1} onHide={this.handleClose1} className="extendpanel">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Extend Package</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <End extend={this.props.data} />
                                    </Modal.Body>

                                </Modal>

                            </div>
                            <div className="col-md-6 btn-2">
                                <Button className="btn btn-block" onClick={this.handleShow}>
                                    extend
                                </Button>
                                <Modal show={this.state.show} onHide={this.handleClose} className="extendpanel">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Extend Package</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Extend extend={this.props.data} />
                                    </Modal.Body>

                                </Modal>
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
    end: v => dispatch(actions.end(v)),
    extend: v => dispatch(actions.extend(v)),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AmberZone)
);