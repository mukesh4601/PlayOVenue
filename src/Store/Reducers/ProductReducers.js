import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    products: [],
    mailSent: false,
    modeofpayment: []
}
const ProductReducers = handleActions({
    ALL_PRODUCTS: (state, action) => {
        return { ...state, mailSent: true, products: action.payload };
    },
    MODEOFPAYMENT: (state, action) => {
        return { ...state, mailSent: true, modeofpayment: action.payload };
    },

}, INITIAL_STATE);

export default ProductReducers;