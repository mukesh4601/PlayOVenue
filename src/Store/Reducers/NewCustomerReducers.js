import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    Newuser: [],
    userfound: false,
    details: []
};
const NewCustomer = handleActions(
    {
        NEW_CUSTOMER: (state, action) => {
            return { ...state, userfound: true, ...action.payload };
        },
        DETAILS: (state, action) => {
            return { ...state, userfound: true, details: action.payload };
        },
    },
    INITIAL_STATE
);

export default NewCustomer;
