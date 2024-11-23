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
import { closeLoan, filteredLoans, filteredLoansBetweenTwoDates, loanList } from '../../actions/loan';
import CollectionReport from '../Reports/CollectionReport';
import moment from 'moment';
import MonthlyCollection from './MonthlyCollection';

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

const CollectionMonthly = () => {
    const [date, setDate] = useState();
    const [endDate, setEndDate] = useState();
    const [totalPendingInstallments, setTotalPendingInstallments] = useState();

    const ListLoans = useSelector((state) => state.loan);
    const AllLoans = ListLoans?.list?.result;
    const filteredLoanList = AllLoans?.filter((item) => item.installments.length >= 1);
    const handleStartDate = (e) => {
        setDate(e.target.value);
    };
    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const checkDiff = () => {
        const monthDifference = moment(new Date(endDate)).diff(new Date(date), 'months', false);
        setTotalPendingInstallments(monthDifference);
    };
    const dispatch = useDispatch();
    const classes = useStyles();
    // TotaltotalCollections
    const collectionsArr = [];
    const usersData = filteredLoanList?.map((item, index) => {
        const total = (item?.loanAmount / 100) * item?.interest;
        const Installments = item?.installments?.reduce((accumulator, current) => accumulator + current.amount, 0);
        const pendingAmount = item?.loanAmount + total - Installments;
        collectionsArr.push(Installments);
        const checkInst = item?.installments?.filter((i) => date == i.date);
        // console.log(totalPendingInstallments);
        let arr = [];
        for (let i = 0; i < totalPendingInstallments; i++) {
            arr.push(Number(item?.installments[i]?.amount));
            // console.log(item?.installments[i]?.amount, 'll');
        }
        return {
            S_No: index + 1,
            loanNo: item?.loanNo?.toString()?.length < 2 ? `0${item?.loanNo}` : item?.loanNo,
            customer: `${item?.customer?.firstName} ${item?.customer?.lastName}`,
            amount: item?.totalBillAmount,
            loanAmount: item?.loanAmount,
            monthlyInstallment: item?.monthlyInstallment,
            paidInstallments: arr?.reduce((accumulator, current) => accumulator + (isNaN(current) ? 0 : current), 0),
            pendingAmount: pendingAmount,
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
        { key: 'S_No', _style: { width: '10%' } },
        { key: 'loanNo', _style: { width: '10%' } },
        { key: 'customer', _style: { width: '10%' } },
        { key: 'amount', _style: { width: '10%' } },
        { key: 'loanAmount', _style: { width: '10%' } },
        { key: 'monthlyInstallment', _style: { width: '10%' } },
        { key: 'paidInstallments', _style: { width: '10%' } },
        { key: 'pendingAmount', _style: { width: '10%' } },
        {
            key: 'Action',
            _style: { width: '10%' },
        },
    ];

    useEffect(() => {
        dispatch(loanList());
    }, [dispatch]);
    const totalCollections = collectionsArr?.reduce((accumulator, current) => accumulator + current, 0);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <h3 className={classes.title}>Monthly Collection Reports</h3>
                    <Formik
                        initialValues={{
                            start: '',
                            end: '',
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            dispatch(filteredLoansBetweenTwoDates(date, endDate));
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form
                                noValidate
                                onSubmit={handleSubmit}
                                id="json-form"
                                className={classes.root}
                                style={{ margin: '30px 0px 0px' }}
                            >
                                <Grid item xs={12} className={classes.flex}>
                                    <Grid item xs={1} className={classes.filterInputs}></Grid>
                                    <Grid item xs={3} className={classes.filterInputs}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <label for="adharNo" class="form-label m-0 mr-2">
                                                {/* From */}
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                onChange={(e) => {
                                                    handleStartDate(e);
                                                }}
                                                onBlur={handleBlur}
                                                class="form-control"
                                                name="start"
                                                aria-describedby="date"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} className={classes.filterInputs}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <label for="adharNo" class="form-label m-0 mr-2">
                                                To
                                            </label>
                                            <input
                                                type="date"
                                                onChange={(e) => {
                                                    handleEndDate(e);
                                                }}
                                                onBlur={handleBlur}
                                                class="form-control"
                                                name="end"
                                                aria-describedby="date"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} className={classes.filterInputs}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={checkDiff}
                                            className={classes.button}
                                        >
                                            Filter
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} className={classes.filterInputs}>
                                        <MonthlyCollection loans={usersData} />
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                    <CardContent className="pb-4 p-2">
                        {filteredLoanList ? (
                            totalPendingInstallments == 0 ? (
                                <h5 className="pt-5 pb-2 text-center">Please select a valid month</h5>
                            ) : (
                                <div>
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
                                                    <CNavLink className="p-0 mx-2" to={`/loan/download-loan/${item?.Action?._id}`}>
                                                        <CBadge className="p-2" style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                                                            Download
                                                        </CBadge>
                                                    </CNavLink>
                                                </td>
                                            ),
                                        }}
                                    />
                                    <Grid item xs={12} className={classes.filterInputs}>
                                        <Grid item xs={12} style={{ display: 'flex' }}>
                                            <Grid item xs={6} className={classes.filterInputs}></Grid>
                                            <Grid item xs={6} className={classes.filterInputs}>
                                                <table class="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <b>Total Collections</b>
                                                            </td>
                                                            <td>{totalCollections}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        ) : (
                            ''
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default connect(null, { loanList })(CollectionMonthly);
