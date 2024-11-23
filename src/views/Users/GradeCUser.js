import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Card, Grid, CardContent, Button } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.css';
import { CNavLink, CBadge } from '@coreui/react';
import { CDataTable } from '@coreui/react';
import { closeLoan, filteredLoans, loanList } from '../../actions/loan';
import GradeCCustomers from '../Reports/GradeCCustomers';

const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    imgproduct: {
        width: '20px',
        height: 'auto',
    },
    title: {
        background: '#3f51b5',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
    },
    view: {
        background: '#eee',
        color: '#fff',
    },
    edit: { background: '#4CAF50', color: '#fff' },
    delete: { background: '#d11a2a', color: '#fff' },
    icons: {
        width: '18px',
        height: '18px',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    filterInputs: {
        margin: '0px 10px ',
    },
    button: {
        padding: '5px',
    },
});

const GradeCUser = () => {
    const ListLoans = useSelector((state) => state.loan);
    const AllLoans = ListLoans?.list?.result ? ListLoans?.list?.result : ListLoans?.list?.loan;
    const dispatch = useDispatch();
    const classes = useStyles();

    const filteredLoanList = AllLoans?.filter((item) => item.installments.length == 0);
    const usersData = filteredLoanList?.map((item, index) => {
        return {
            loanNo: item?.loanNo?.toString()?.length < 2 ? `0${item?.loanNo}` : item?.loanNo,
            customer: `${item?.customer?.firstName} ${item?.customer?.lastName}`,
            amount: item?.totalBillAmount,
            loanAmount: item?.loanAmount,
            monthlyInstallment: item?.monthlyInstallment,
            Action: item,
        };
    });

    const getId = (_id) => {
        return _id;
    };
    const CloseLoan = (id) => {
        dispatch(closeLoan(getId(id)));
        setTimeout(() => {
            dispatch(loanList());
        }, 2000);
    };
    const fields = [
        { key: 'loanNo', _style: { width: '10%' } },
        { key: 'customer', _style: { width: '10%' } },
        { key: 'amount', _style: { width: '10%' } },
        { key: 'loanAmount', _style: { width: '10%' } },
        { key: 'monthlyInstallment', _style: { width: '10%' } },
        {
            key: 'Action',
            _style: { width: '10%' },
        },
    ];

    useEffect(() => {
        dispatch(loanList());
    }, [dispatch]);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <h3 className={classes.title}>Grade C Customers</h3>
                    <Formik
                        initialValues={{
                            type: '',
                            date: '',
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            dispatch(filteredLoans(values.type, values.date));
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form noValidate onSubmit={handleSubmit} id="json-form" className={classes.root}>
                                <Grid item xs={12} className={classes.flex}>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={10} className={classes.flex}>
                                        <Grid item xs={9} className={classes.filterInputs}></Grid>
                                        <Grid item xs={3} style={{ marginTop: '10px' }}>
                                            <GradeCCustomers loans={filteredLoanList ? filteredLoanList : AllLoans} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                    <CardContent className="p-2">
                        <CDataTable
                            items={usersData}
                            fields={fields}
                            tableFilter
                            itemsPerPageSelect
                            itemsPerPage={50}
                            sorter
                            pagination
                            scopedSlots={{
                                Action: (item) => (
                                    <td className="py-2 d-flex">
                                        <CNavLink className="p-0" to={`/loan/detail/${item?.Action?._id}`}>
                                            <CBadge className="p-2" color="dark">
                                                View
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0 mx-2" to={`/loan/edit-loan/${item?.Action?._id}`}>
                                            <CBadge className="p-2" color="success">
                                                Edit
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0" to="" onClick={() => CloseLoan(item?.Action?._id)}>
                                            <CBadge className="p-2" color="danger">
                                                Close
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0 mx-2" to={`/loan/download-loan/${item?.Action?._id}`}>
                                            <CBadge className="p-2" style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                                                Download
                                            </CBadge>
                                        </CNavLink>
                                    </td>
                                ),
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default connect(null, { loanList })(GradeCUser);
