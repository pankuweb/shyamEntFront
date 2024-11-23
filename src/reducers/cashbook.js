import { CASHBOOK_LIST, CASHBOOK_DELETE, ADD_CASHBOOK } from '../actions/type';

const INITIAL_STATE = {
    list: [{}],
    response: [{}],
};

const cashbook = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CASHBOOK_LIST:
            return { ...state, list: action.payload };
        case CASHBOOK_DELETE:
            return { ...state, response: action.payload };
        case ADD_CASHBOOK:
            return { ...state, response: action.payload };
        default:
            return state;
    }
};
export default cashbook;
