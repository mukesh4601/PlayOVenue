import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    zxc: "asds",
    mailSent: false
}
const AuthReducer = handleActions({
    VERIFY_USER: (state, action) => {
        return { ...state, mailSent: true, ...action.payload };
    },

}, INITIAL_STATE);

export default AuthReducer;