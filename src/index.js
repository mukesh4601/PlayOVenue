import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./Store/Reducers/Index";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter as Router } from "react-router-dom";


import Login from "./components/login/login";
import MobSearch from "./components/mobsearch/mobsearch";
import NewEntry from "./components/newcustomer/newcustomer";
import ExistingCus from "./components/existingcustomer/existingcustomer";
import Coupons from "./components/coupons/coupon";
import Summary from "./components/summary/summary";
import EventSelection from "./components/eventselection/eventselection";
import UserDashboard from "./components/dashboard/userdashboard/userdashboard";
import SafeZone from "./components/dashboard/userdashboard/safezone/safezone";
import AmberZone from "./components/dashboard/userdashboard/amberzone/amberzone";
import DangerZone from "./components/dashboard/userdashboard/safezone/safezone";


import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25
        })) ||
    compose;

const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

const routing = (
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={Login} />
                <Route path="/mobsearch" component={MobSearch} />
                <Route path="/newentry" component={NewEntry} />
                <Route path="/existingcus" component={ExistingCus} />
                <Route path="/eventselection" component={EventSelection} />
                <Route path="/summary" component={Summary} />
                <Route path="/coupon" component={Coupons} />
                <Route path="/userdashboard" component={UserDashboard} />
                <Route path="/safezone" component={SafeZone} />
                <Route path="/amberzone" component={AmberZone} />
                <Route path="/dangerzone" component={DangerZone} />
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
