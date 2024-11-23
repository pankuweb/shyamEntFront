import { ADD_USER, USER_LIST, USER_DELETE, EDIT_USER } from './type';
import { APIURL } from './config';
import { toast } from 'react-toastify';
const axios = require('axios');

//Add New User
export const addUser = (values) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };

    var formData = new FormData();
    formData.append('firstName', values?.firstName);
    formData.append('lastName', values?.lastName);
    formData.append('relation', values?.relation);
    formData.append('relativeFirstName', values?.relativeFirstName);
    formData.append('relativeLastName', values?.relativeLastName);
    formData.append('mobile', values?.mobile);
    formData.append('adharNo', values?.adharNo);
    formData.append('gender', values?.gender);
    formData.append('dob', values?.dob);
    formData.append('state', values?.state);
    formData.append('distt', values?.distt);
    formData.append('city', values?.city);
    formData.append('pinCode', values?.pinCode);
    formData.append('correspondAddress', values?.correspondAddress);
    formData.append('permanentAddress', values?.permanentAddress);
    formData.append('nearAbout', values?.nearAbout);
    formData.append('photo', values?.photo);

    try {
        const res = await axios.post(`${APIURL}/api/v1/users`, formData, config);
        dispatch({
            type: ADD_USER,
            payload: res.data,
        });
        toast.success(res?.data?.message);
    } catch (err) {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error);
    }
};

// User List
export const userList = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/users`, config);
        dispatch({
            type: USER_LIST,
            payload: res.data.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => console.log(error.msg));
        }
    }
};

//Edit User
export const editUser = (values, id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };

    var formData = new FormData();
    formData.append('firstName', values?.firstName);
    formData.append('lastName', values?.lastName);
    formData.append('relation', values?.relation);
    formData.append('relativeFirstName', values?.relativeFirstName);
    formData.append('relativeLastName', values?.relativeLastName);
    formData.append('mobile', values?.mobile);
    formData.append('adharNo', values?.adharNo);
    formData.append('gender', values?.gender);
    formData.append('dob', values?.dob);
    formData.append('state', values?.state);
    formData.append('distt', values?.distt);
    formData.append('city', values?.city);
    formData.append('pinCode', values?.pinCode);
    formData.append('correspondAddress', values?.correspondAddress);
    formData.append('permanentAddress', values?.permanentAddress);
    formData.append('nearAbout', values?.nearAbout);
    formData.append('photo', values?.photo);

    try {
        const res = await axios.patch(`${APIURL}/api/v1/users/${id}`, formData, config);
        dispatch({
            type: EDIT_USER,
            payload: res.data,
        });
        toast.success(res?.data?.message);
    } catch (err) {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error);
    }
};

//Delete User
export const deleteUser = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    try {
        const res = await axios.delete(`${APIURL}/api/v1/users/${id}`, config);
        dispatch({
            type: USER_DELETE,
            payload: res.data,
        });
        toast.success(res.data.message);
    } catch (err) {
        console.log(err);
    }
};
