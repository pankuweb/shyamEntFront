import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Card, Grid, CardContent, Button } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.css';
import { CDataTable } from '@coreui/react';
import { filteredLoansBetweenTwoDates, loanList, loanoverdue } from '../../actions/loan';
import CollectionReport from './../Reports/CollectionReport';
import OverdueReport from '../Reports/OverdueReport';
import dateFormat from 'dateformat';
import moment from 'moment';

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

const DailyLoanOverdue = () => {
    const ListLoans = useSelector((state) => state.loan);
    const AllLoansList = ListLoans?.list?.loan;
    const AllLoans = ListLoans?.list?.result;
    const AllPendingOldLoans = ListLoans?.list?.pendingLoanData;
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
    const [totalPendingInstallments, setTotalPendingInstallments] = useState();

    const handleStartDate = (e) => {
        setStartDate(e);
    };

    // 👇 2
    // console.log(getMonthDifference(startDate, endDate));
    var result = unclosed?.filter((element) => element?.installmentsDate?.some((subElement) => subElement == startDate));
    var finalResult = result?.filter((element) => element?.installments?.some((subElement) => subElement.date !== startDate));

    let pendinemis = [];

    //
    // var a = AllLoansList?.filter((element) => element?.installmentsDate?.some((subElement) => subElement < startDate));
    // var b = a?.filter((element) => {
    //     element.installmentsDate = element?.installmentsDate?.filter((item) => item < startDate);
    //     return element;
    // });
    // const c = b?.filter((item) => {
    //     const totalOfIns = item?.installments?.reduce((accumulator, current) => accumulator + current.amount, 0);
    //     item.ins = totalOfIns;
    //     item.datewisetotal = item.monthlyInstallment * (item.installmentsDate.length + 1);
    //     return item.ins < item.datewisetotal && item.completed != 'true';
    // });
    // const d = c?.installmentsDate?.filter((item) => item < startDate);
    // console.log(c, 'a');
    // var b = a?.filter((element) => element?.installments?.some((subElement) => subElement.date < startDate));
    // console.log(a, 'a');
    // const installmentsLength = unclosed?.installmentsDate;

    //
    const usersData = AllLoans?.map((item, index) => {
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
        const positionOfStartDate = item?.installmentsDate?.indexOf(startDate);
        // console.log(positionOfStartDate + 1, item?.installments?.[positionOfStartDate]?.amount, 'positionOfStartDate');
        const totalOfIns = item?.installments?.reduce((accumulator, current) => accumulator + current.amount, 0);
        const datewisetotal = item.monthlyInstallment * item.installmentsDate.length;
        return {
            S_No: index + 1,
            customer: `${item?.customer?.firstName} ${item?.customer?.lastName}`,
            phone_no: item?.customer?.mobile,
            installmentAmount: item?.monthlyInstallment,
            Recieved_Installment: totalOfIns,
            pendingInstallments: 1,
            address: item?.customer?.permanentAddress,
            EMI_Pending: datewisetotal - totalOfIns,
            EMI_Advance: pendingEMI < 0 ? Math.abs(pendingEMI) : 0,
            totalCollections: result?.reduce((accumulator, current) => accumulator + current.monthlyInstallment, 0),
            totalPendingEmi: pendinemis?.reduce((accumulator, current) => accumulator + (current > 0 ? current : 0), 0),
        };
    });
    const totalPendingEmi = pendinemis?.reduce((accumulator, current) => accumulator + (current > 0 ? current : 0), 0);

    const fields = [
        { key: 'S_No', _style: { width: '10%' } },
        { key: 'customer', _style: { width: '10%' } },
        { key: 'phone_no', _style: { width: '10%' } },
        { key: 'installmentAmount', _style: { width: '10%' } },
        { key: 'Recieved_Installment', _style: { width: '10%' } },
        { key: 'EMI_Pending', _style: { width: '10%' } },
        { key: 'EMI_Advance', _style: { width: '10%' } },
        { key: 'pendingInstallments', _style: { width: '10%' } },
        { key: 'address', _style: { width: '10%' } },
    ];

    useEffect(() => {
        dispatch(loanList());
    }, [dispatch]);
    const totalCollections = finalResult?.reduce((accumulator, current) => accumulator + current.monthlyInstallment, 0);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <h3 className={classes.title}>Loan Overdue Single Day Report</h3>
                    <Formik
                        initialValues={{
                            start: '',
                        }}
                        enableReinitialize={true}
                        onSubmit={() => {
                            dispatch(loanoverdue(startDate));
                            dispatch(loanList());
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
                                                Date
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
                                    <Grid item xs={2} className={classes.filterInputs}>
                                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                            Filter
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} className={classes.filterInputs}>
                                        <OverdueReport loans={usersData} />
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

export default connect(null, { loanList })(DailyLoanOverdue);
