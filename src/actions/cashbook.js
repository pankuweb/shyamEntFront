import { ADD_CASHBOOK, CASHBOOK_LIST, CASHBOOK_DELETE } from './type';
import { APIURL } from './config';
import { toast } from 'react-toastify';
const axios = require('axios');

//Add Installment
export const addCashbook = (values) => async (dispatch) => {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        title: values?.title,
        date: values?.date,
        debit: values?.debit,
        credit: values?.credit,
        total: values?.total,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(`${APIURL}/api/v1/cashbook`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: ADD_CASHBOOK,
                payload: result.data,
            });
            toast.success(result?.message);
        })
        .catch((error) => console.log('error', error));
};

// Loan List
export const cashbookList = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/cashbook`, config);
        dispatch({
            type: CASHBOOK_LIST,
            payload: res.data.data,
        });
    } catch (err) {
        const errors = err;
    }
};

//Delete Transition
export const deleteCashBook = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };

    const config = {
        headers: header,
    };
    try {
        const res = await axios.delete(`${APIURL}/api/v1/cashbook/${id}`, config);
        dispatch({
            type: CASHBOOK_DELETE,
            payload: res.data,
        });
        toast.success(res.data.message);
    } catch (err) {
        console.log(err);
    }
};
