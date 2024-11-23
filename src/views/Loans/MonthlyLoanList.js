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
import { closeLoan, deleteLoan, filteredLoans, loanList } from '../../actions/loan';
import ListReport from '../Reports/ListReport';
import dateFormat from 'dateformat';

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

const MonthlyLoanList = () => {
    const [see, setSee] = useState('show');

    const [loanId, setLoanId] = useState();
    const ListLoans = useSelector((state) => state.loan);
    const AllLoans = ListLoans?.list?.result ? ListLoans?.list?.result : ListLoans?.list?.loan;
    const dispatch = useDispatch();
    const classes = useStyles();

    const filteredLoanList = AllLoans?.sort((a, b) => b.createdAt - a.createdAt);
    const unClosedLoans = filteredLoanList?.filter((item) => item.completed == 'false');
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const test = unClosedLoans?.filter((i) => i.createdAt > dateFormat(firstDay, 'isoDateTime'));
    // console.log(test);
    // console.log(unClosedLoans, 'unClosedLoans');
    const usersData = test?.map((item, index) => {
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
    const DeleteLoan = (id) => {
        dispatch(deleteLoan(getId(id)));
        setTimeout(() => {
            dispatch(loanList());
        }, 2000);
    };
    const downloadFile = (id) => {
        setLoanId(id);
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

    const TotalAmounts = test?.reduce((accumulator, current) => accumulator + current.totalBillAmount, 0);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <h3 className={classes.title}>Loan List</h3>
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
                                        <Grid item xs={7} className={classes.filterInputs}></Grid>
                                        <Grid item xs={2} className={classes.filterInputs}></Grid>
                                        <Grid item xs={3} style={{ marginTop: '10px' }}>
                                            <ListReport loans={unClosedLoans} />
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
                                        <CNavLink className="p-0 mx-2" to={`/loan/detail/${item?.Action?._id}`}>
                                            <CBadge className="p-2" color="dark">
                                                View
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0" to={`/loan/edit-loan/${item?.Action?._id}`}>
                                            <CBadge className="p-2" color="success">
                                                Edit
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0 mx-2" to={`/loan/add-installment/${item?.Action?._id}`}>
                                            <CBadge className="p-2" color="success">
                                                Ins.
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0" to="" onClick={() => CloseLoan(item?.Action?._id)}>
                                            <CBadge className="p-2" color="danger">
                                                Close
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0 mx-2" to="" onClick={() => DeleteLoan(item?.Action?._id)}>
                                            <CBadge className="p-2" color="danger">
                                                Delete
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
                    <Grid item xs={12} className={classes.filterInputs}>
                        <Grid item xs={12} style={{ display: 'flex' }}>
                            <Grid item xs={6} className={classes.filterInputs}></Grid>
                            <Grid item xs={6} className={classes.filterInputs}>
                                <table class={`table table-bordered table-sm `}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b>Total Sale</b>
                                            </td>
                                            <td>{TotalAmounts ? TotalAmounts : 0}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};

export default connect(null, { loanList })(MonthlyLoanList);
