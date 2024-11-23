import { combineReducers } from 'redux';
import customizationReducer from '../store/customizationReducer';
import auth from './auth';
import user from './user';
import loan from './loan';
import cashbook from './cashbook';
import book from './book';

export default combineReducers({
    customization: customizationReducer,
    auth,
    user,
    loan,
    cashbook,
    book
});
