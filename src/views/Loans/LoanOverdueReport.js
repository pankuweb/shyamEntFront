import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Card, Grid, CardContent, Button } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.css';
import { CDataTable } from '@coreui/react';
import { filteredLoansBetweenTwoDates, loanList } from '../../actions/loan';
import CollectionReport from './../Reports/CollectionReport';
import OverdueReport from '../Reports/OverdueReport';
import dateFormat from 'dateformat';
import moment from 'moment';
import MonthlyOverdue from '../Reports/MonthlyOverdue';

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

const LoanOverdueReport = () => {
    const ListLoans = useSelector((state) => state.loan);
    const AllLoans = ListLoans?.list?.result;
    const unclosed = AllLoans?.filter((item) => {
        // if (item.completed == 'false' && item.installmentsDate?.[0] <= dateFormat(new Date(), 'yyyy-mm-dd')) {
        if (item.completed == 'false') {
            return item;
        }
    });
    const filteredLoanList = unclosed?.filter((item) => item.installments.length < item.termInMonth);
    // const filteredLists = filteredLoanList?.filter((item) => item.installmentsDate?.[0] <= dateFormat(new Date(), 'yyyy-mm-dd'));
    const dispatch = useDispatch();
    const classes = useStyles();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [totalPendingInstallments, setTotalPendingInstallments] = useState();

    const handleStartDate = (e) => {
        setStartDate(e);
    };
    const handleEndDate = (e) => {
        setEndDate(e);
    };

    const checkDiff = () => {
        const monthDifference = moment(new Date(endDate)).diff(new Date(startDate), 'months', false);
        setTotalPendingInstallments(monthDifference);
    };
    // 👇️ 2
    // console.log(getMonthDifference(startDate, endDate));
    let pendinemis = [];

    const usersData = filteredLoanList?.map((item, index) => {
        const pendig =
            totalPendingInstallments < Number(item?.termInMonth) - Number(item?.installments?.length)
                ? totalPendingInstallments
                : Number(item?.termInMonth) - Number(item?.installments?.length);
        let arr = [];
        for (let i = 0; i < item?.installments?.length; i++) {
            arr.push(Number(item?.monthlyInstallment) - Number(item?.installments[i]?.amount));
            pendinemis.push(Number(item?.monthlyInstallment) - Number(item?.installments[i]?.amount));
        }
        const pendingEMI = arr?.reduce((accumulator, current) => accumulator + (isNaN(current) ? 0 : current), 0);
        const lastInsDate = item?.installments?.[item?.installments?.length - 1]?.date;
        const lastInsAmt = item?.installments?.[item?.installments?.length - 1]?.amount;

        return {
            S_No: index + 1,
            customer: `${item?.customer?.firstName} ${item?.customer?.lastName}`,
            phone_no: item?.customer?.mobile,
            monthlyInstallment: item?.monthlyInstallment,
            Last_Installment: `${lastInsDate ? lastInsDate : ''}(${lastInsAmt ? lastInsAmt : '-'})`,
            pendingInstallments: pendig ? pendig : Number(item?.termInMonth) - Number(item?.installments?.length),
            address: item?.customer?.permanentAddress,
            EMI_Pending: pendingEMI > 0 ? pendingEMI : 0,
            EMI_Advance: pendingEMI < 0 ? Math.abs(pendingEMI) : 0,
        };
    });
    const totalCollections = filteredLoanList?.reduce((accumulator, current) => accumulator + current.monthlyInstallment, 0);
    const totalPendingEmi = pendinemis?.reduce((accumulator, current) => accumulator + (current > 0 ? current : 0), 0);

    const fields = [
        { key: 'S_No', _style: { width: '5%' } },
        { key: 'customer', _style: { width: '10%' } },
        { key: 'phone_no', _style: { width: '10%' } },
        { key: 'monthlyInstallment', _style: { width: '10%' } },
        { key: 'Last_Installment', _style: { width: '10%' } },
        { key: 'EMI_Pending', _style: { width: '10%' } },
        { key: 'EMI_Advance', _style: { width: '10%' } },
        { key: 'pendingInstallments', _style: { width: '10%' } },
        { key: 'address', _style: { width: '10%' } },
    ];

    useEffect(() => {
        dispatch(loanList());
    }, [dispatch]);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <h3 className={classes.title}>Loan Overdue Monthly Report</h3>
                    <Formik
                        initialValues={{
                            start: '',
                            end: '',
                        }}
                        enableReinitialize={true}
                        onSubmit={() => {
                            dispatch(filteredLoansBetweenTwoDates(startDate, endDate));
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
                                                From
                                            </label>
                                            <input
                                                type="date"
                                                onChange={(e) => {
                                                    handleStartDate(e.target.value);
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
                                                    handleEndDate(e.target.value);
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
                                            className={classes.button}
                                            onClick={checkDiff}
                                        >
                                            Filter
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} className={classes.filterInputs}>
                                        <MonthlyOverdue loans={usersData} />
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>

                    <CardContent className="p-2">
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
                                    />
                                    <Grid item xs={12} className={classes.filterInputs}>
                                        <Grid item xs={12} style={{ display: 'flex' }}>
                                            <Grid item xs={6} className={classes.filterInputs}></Grid>
                                            <Grid item xs={6} className={classes.filterInputs}>
                                                <table class="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <b>Total Installments</b>
                                                            </td>
                                                            <td>{totalCollections}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Pending EMI</b>
                                                            </td>
                                                            <td>{totalPendingEmi}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Sub Total</b>
                                                            </td>
                                                            <td>{totalCollections + totalPendingEmi}</td>
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

export default connect(null, { loanList })(LoanOverdueReport);
