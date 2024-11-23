import { ADD_USER, USER_LIST, USER_DETAIL, USER_DELETE, EDIT_USER } from '../actions/type';

const INITIAL_STATE = {
    list: [{}],
    response: [{}],
    detail: [{}],
};

const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LIST:
            return { ...state, list: action.payload };
        case USER_DETAIL:
            return { ...state, detail: action.payload };
        case USER_DELETE:
            return { ...state, response: action.payload };
        case EDIT_USER:
            return { ...state, response: action.payload };
        case ADD_USER:
            return { ...state, response: action.payload };
        default:
            return state;
    }
};
export default user;
