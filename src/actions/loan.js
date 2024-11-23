import { ADD_LOAN, LOAN_LIST, LOAN_DELETE, EDIT_LOAN, LOAN_CLOSE, ADD_INSTALLMENT, NOTIFICATION_LIST, CURRENT_DAY_LIST } from './type';
import { APIURL } from './config';
import { toast } from 'react-toastify';
import dateFormat from 'dateformat';
const axios = require('axios');

//Add New Loan
export const addLoan = (values) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };

    const config = {
        headers: header,
    };
    var formData = new FormData();
    formData.append('totalBillAmount', values?.totalBillAmount);
    formData.append('downPayment', values?.downPayment);
    formData.append('loanAmount', values?.loanAmount);
    formData.append('termInMonth', values?.termInMonth);
    formData.append('interest', values?.interest);
    formData.append('monthlyInstallment', values?.monthlyInstallment);
    formData.append('verifiedBy', values?.verifiedBy);
    formData.append('customer', values?.customer);
    formData.append('installmentsDate', values?.installmentsDate);
    formData.append('fileCharges', values?.fileCharges);
    formData.append('details', values?.details);
    formData.append('gaurenterName', values?.gaurenterName);
    formData.append('gaurenterMobileNo', values?.gaurenterMobileNo);

    try {
        const res = await axios.post(`${APIURL}/api/v1/loans`, formData, config);
        dispatch({
            type: ADD_LOAN,
            payload: res.data,
        });
        toast.success(res?.data?.message);
    } catch (err) {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error);
    }
};

//Add Installment
export const addInstallment = (values, id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        title: values?.title,
        amount: values?.amount,
        date: values?.date,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(`${APIURL}/api/v1/loans/installments/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: ADD_INSTALLMENT,
                payload: result.data,
            });
            toast.success(result?.message);
        })
        .catch((error) => console.log('error', error));
};

// Loan List
export const loanList = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/loans`, config);
        dispatch({
            type: LOAN_LIST,
            payload: res.data.data,
        });
    } catch (err) {
        const errors = err;
    }
};

//Edit Loan
export const editLoan = (values, id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    var formData = new FormData();
    formData.append('totalBillAmount', values?.totalBillAmount);
    formData.append('downPayment', values?.downPayment);
    formData.append('loanAmount', values?.loanAmount);
    formData.append('termInMonth', values?.termInMonth);
    formData.append('interest', values?.interest);
    formData.append('monthlyInstallment', values?.monthlyInstallment);
    formData.append('verifiedBy', values?.verifiedBy);
    formData.append('customer', values?.customer);
    formData.append('installmentsDate', values?.installmentsDate);
    formData.append('fileCharges', values?.fileCharges);
    formData.append('details', values?.details);
    formData.append('gaurenterName', values?.gaurenterName);
    formData.append('gaurenterMobileNo', values?.gaurenterMobileNo);

    try {
        const res = await axios.patch(`${APIURL}/api/v1/loans/${id}`, formData, config);
        dispatch({
            type: EDIT_LOAN,
            payload: res.data,
        });
        toast.success(res?.data?.message);
    } catch (err) {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error);
    }
};

//Edit Loan
export const reopenLoan = (id) => async (dispatch) => {
    console.log(id);
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    var formData = new FormData();

    try {
        const res = await axios.patch(`${APIURL}/api/v1/loans/reopen-loan/${id}`, formData, config);
        dispatch({
            type: EDIT_LOAN,
            payload: res.data,
        });
        toast.success(res?.data?.message);
    } catch (err) {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error);
    }
};

//Delete Loan
export const deleteLoan = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };

    const config = {
        headers: header,
    };
    try {
        const res = await axios.delete(`${APIURL}/api/v1/loans/${id}`, config);
        dispatch({
            type: LOAN_DELETE,
            payload: res.data,
        });
        toast.success(res.data.message);
    } catch (err) {
        console.log(err);
    }
};

//Delete Loan
export const closeLoan = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    var formData = new FormData();

    try {
        const res = await axios.patch(`${APIURL}/api/v1/loans/close-loan/${id}`, formData, config);
        dispatch({
            type: LOAN_CLOSE,
            payload: res.data,
        });
        toast.success(res.data.message);
    } catch (err) {
        console.log(err);
    }
};

// Filtered Loan List
export const filteredLoans = (date) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };

    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/loans/filtered-loans/?date=${date}`, config);
        dispatch({
            type: LOAN_LIST,
            payload: res.data.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => console.log(error.msg));
        }
    }
};

// Filtered Loan List
export const loanoverdue = (date) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };

    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/loans/overdue-loans/?completed=false&date=${date}`, config);
        dispatch({
            type: LOAN_LIST,
            payload: res.data.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => console.log(error.msg));
        }
    }
};

// Filtered Loan List
export const filteredLoansBetweenTwoDates = (start, end) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };

    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/loans/loan-reports/?start=${start}&end=${end}`, config);
        dispatch({
            type: LOAN_LIST,
            payload: res.data.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => console.log(error.msg));
        }
    }
};

// Loan Notifications
export const loanNotifications = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const date = dateFormat(new Date(), 'yyyy-mm-dd');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    fetch(`${APIURL}/api/v1/loans/notifications?read=false&date=${date}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: NOTIFICATION_LIST,
                payload: result.data,
            });
        })
        .catch((error) => console.log('error', error));
};

// Loan List
export const getEditLoan = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };
    try {
        const res = await axios.get(`${APIURL}/api/v1/loans/${id}`, config);
        let loan = res.data.data.loan[0];
        loan.customer = loan._id;
        loan.read = true;
        loan.totalBillAmount = loan.totalBillAmount;
        loan.downPayment = loan.downPayment;
        loan.loanAmount = loan.loanAmount;
        loan.termInMonth = loan.termInMonth;
        loan.interest = loan.interest;
        loan.monthlyInstallment = loan.monthlyInstallment;
        loan.verifiedBy = loan.verifiedBy;
        loan.customer = loan.customer;
        loan.installmentsDate = loan.installmentsDate;
        loan.fileCharges = loan.fileCharges;
        dispatch(editLoan(loan, id));
    } catch (err) {
        const errors = err;
    }
};

// Today's Loan List
export const getTodaysLoan = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    const header = {
        Authorization: `Bearer ${token}`,
    };
    const config = {
        headers: header,
    };

    try {
        const res = await axios.get(`${APIURL}/api/v1/loans/todays-loans`, config);
        dispatch({
            type: CURRENT_DAY_LIST,
            payload: res.data,
        });
    } catch (err) {
        const errors = err;
    }
};

//Edit installment
export const editInstallment = (values, id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(values);
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(`${APIURL}/api/v1/loans/installments/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            dispatch({
                type: ADD_INSTALLMENT,
                payload: result.data,
            });
            toast.success(result?.message);
        })
        .catch((error) => console.log('error', error));
};

//Delete deleteInstallment
export const deleteInstallment = (loanId, insId) => async (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('token'));
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        id: insId,
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(`${APIURL}/api/v1/loans/installments/${loanId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result) {
                toast.success('Installment deleted successfully!');
            }
        })
        .catch((error) => console.log('error', error));
};
