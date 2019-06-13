import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    userdetails: [],
    userfound: false
};
const MobAuthReducer = handleActions(
    {
        SEARCH_MOBILE: (state, action) => {
            return { ...state, userfound: true, userdetails: action.payload };
        },
        SEARCHE_MOBILE: (state, action) => {
            return { ...state, userfound: true, userdetails: action.payload };
        }
    },
    INITIAL_STATE
);

export default MobAuthReducer;
