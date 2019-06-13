import { combineReducers } from "redux";
import AuthReducer from "./AuthReducers";
import MobReducer from "./MobAuthReducers";
import ZoneReducers from "./ZoneReducers";
import NewCustomer from "./NewCustomerReducers";
import AllProducts from "./ProductReducers";

export default combineReducers({
    auth: AuthReducer,
    mob: MobReducer,
    zone: ZoneReducers,
    newuser: NewCustomer,
    allproducts: AllProducts
})