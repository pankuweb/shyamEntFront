import { ADD_LOAN, LOAN_LIST, LOAN_DETAIL, LOAN_DELETE, EDIT_LOAN, NOTIFICATION_LIST, CURRENT_DAY_LIST, LOAN_CLOSE } from '../actions/type';

const INITIAL_STATE = {
    list: [{}],
    response: [{}],
    detail: [{}],
    notifications: [{}],
    current_day_loans: [{}],
};

const loan = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAN_LIST:
            return { ...state, list: action.payload };
        case LOAN_DETAIL:
            return { ...state, detail: action.payload };
        case LOAN_CLOSE:
            return { ...state, response: action.payload };
        case LOAN_DELETE:
            return { ...state, response: action.payload };
        case EDIT_LOAN:
            return { ...state, response: action.payload };
        case ADD_LOAN:
            return { ...state, response: action.payload };
        case NOTIFICATION_LIST:
            return { ...state, notifications: action.payload };
        case CURRENT_DAY_LIST:
            return { ...state, current_day_loans: action.payload };
        default:
            return state;
    }
};
export default loan;
