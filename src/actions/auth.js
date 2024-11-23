import axios from 'axios';
import { LOGIN_SUCCESS, EDIT_USER } from './type';
import { APIURL } from './config';
import { toast } from 'react-toastify';

//Login User

export const login = (data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // const userType = 'admin';
    const email = data.formInput.email;
    const password = data.formInput.password;

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${APIURL}/api/v1/users/login`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        if (res) {
            localStorage.setItem('id', res?.data?.id);
            localStorage.setItem('token', res?.data?.token);
            toast.success('Logged in successfully!');
        } else {
            toast.error('Please enter correct details!');
        }
    } catch (err) {
        const error = err.response ? err.response.data.message : err.message;
        toast.error('Please enter correct details!');
    }
};
//Edit User
export const editAdmin = (values) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        password: values.formInput.password,
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(`${APIURL}/api/v1/users/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: EDIT_USER,
                payload: result,
            });
            toast.success('Updated Password!');
        })
        .catch((error) => console.log('error', error));
};
