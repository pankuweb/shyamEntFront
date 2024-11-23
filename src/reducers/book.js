import { BOOK_LIST, BOOK_DELETE, ADD_BOOK } from '../actions/type';

const INITIAL_STATE = {
    list: [{}],
    response: [{}],
};

const book = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOOK_LIST:
            return { ...state, list: action.payload };
        case BOOK_DELETE:
            return { ...state, response: action.payload };
        case ADD_BOOK:
            return { ...state, response: action.payload };
        default:
            return state;
    }
};
export default book;
