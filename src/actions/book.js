import { ADD_BOOK, BOOK_LIST, BOOK_DELETE } from './type';
import { APIURL } from './config';
import { toast } from 'react-toastify';
const axios = require('axios');

//Add Installment
export const addBook = (values) => async (dispatch) => {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        title: values?.title,
        date: values?.date,
        customer: values?.customer,
        mobile: values?.mobile,
        pending: values?.pending,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(`${APIURL}/api/v1/book`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: ADD_BOOK,
                payload: result.data,
            });
            toast.success('Data Addedd Successfully!');
        })
        .catch((error) => console.log('error', error));
};

// Loan List
export const bookList = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/book`, config);
        dispatch({
            type: BOOK_LIST,
            payload: res.data.data,
        });
    } catch (err) {
        const errors = err;
    }
};

//Delete Transition
export const deleteBook = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };

    const config = {
        headers: header,
    };
    try {
        const res = await axios.delete(`${APIURL}/api/v1/book/${id}`, config);
        dispatch({
            type: BOOK_DELETE,
            payload: res.data,
        });
        toast.success('Data Deleted Successfully!');
    } catch (err) {
        console.log(err);
    }
};
