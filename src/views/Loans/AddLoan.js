import React, { useReducer, useState, useEffect } from 'react';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLoan } from '../../actions/loan';
import { Formik } from 'formik';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import { IoMdRemove } from '@react-icons/all-files/io/IoMdRemove';
import { userList } from '../../actions/user';
import NavItem from '../../layout/MainLayout/Sidebar/MenuList/NavItem';

const AddLoan = (props) => {
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
            marginTop: '20px',
            width: '200px',
            borderRadius: '0px',
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
        root: {
            padding: theme.spacing(3, 2),
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400,
            marginBottom: '10px',
        },
        formTitle: {
            padding: theme.spacing(1, 2),
            textAlign: 'center',
            background: '#3f51b5',
            color: '#fff',
        },
        submitButtonWrapper: {
            display: 'flex',
            justifyContent: 'center',
        },
        inputGroups: {
            padding: theme.spacing(0, 1),
        },
    }));
    const [terminMonth, setTerminMonth] = useState();
    const [loanAmt, setloanAmt] = useState();
    const [installmentAmount, setInstallmentAmount] = useState();
    const [interestVal, setInterestVal] = useState();
    const ListUsers = useSelector((state) => state.user);
    const AllUsers = ListUsers?.list?.user?.filter((item) => !item.email);
    const dispatch = useDispatch();
    let history = useHistory();
    const dates = [];

    const classes = useStyles();

    useEffect(() => {
        dispatch(userList());
    }, [dispatch]);

    const handleloanAmount = (e) => {
        setloanAmt(e.target.value);
    };

    const handleTermChange = (e) => {
        setTerminMonth(e.target.value);
        setInstallmentAmount(Math.floor(loanAmt / e.target.value));
    };

    const handleInterstChange = (e) => {
        const total = (Number(loanAmt) / 100) * e.target.value;
        setInterestVal(e.target.value);
        setInstallmentAmount(Math.floor((total + Number(loanAmt)) / Number(terminMonth)));
    };

    return (
        <div>
            <Grid item xs={10} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Add New Loan
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>
                    <Formik
                        initialValues={{
                            totalBillAmount: '',
                            downPayment: '',
                            loanAmount: '',
                            termInMonth: '',
                            interest: '',
                            monthlyInstallment: '',
                            verifiedBy: '',
                            customer: '',
                            installmentsDate: '',
                            fileCharges: 0,
                            details: '',
                            gaurenterName: '',
                            gaurenterMobileNo: ''
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            values.termInMonth = terminMonth;
                            values.loanAmount = loanAmt;
                            values.monthlyInstallment = installmentAmount;
                            values.totalInstallments = dates.length;
                            values.interest = interestVal;
                            dispatch(addLoan(values));
                            if (values.installmentsDate !== '') {
                                setTimeout(() => {
                                    history.push('/loan/list');
                                }, 3000);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form noValidate onSubmit={handleSubmit} id="json-form" className={classes.root}>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="totalBillAmount" class="form-label">
                                                Total Bill Amount
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.totalBillAmount}
                                                name="totalBillAmount"
                                                aria-describedby="totalBillAmount"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="downPayment" class="form-label">
                                                Down Payment
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.downPayment}
                                                name="downPayment"
                                                aria-describedby="downPayment"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="loanAmount" class="form-label">
                                                Loan Amount
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.loanAmount}
                                                name="loanAmount"
                                                aria-describedby="loanAmount"
                                                onChange={handleloanAmount}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="termInMonth" class="form-label">
                                                Term in Month
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.termInMonth}
                                                name="termInMonth"
                                                aria-describedby="termInMonth"
                                                onChange={handleTermChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="interest" class="form-label">
                                                Interest
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.interest}
                                                name="interest"
                                                aria-describedby="interest"
                                                onChange={handleInterstChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="monthlyInstallment" class="form-label">
                                                Monthly Installment
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={installmentAmount}
                                                name="monthlyInstallment"
                                                aria-describedby="monthlyInstallment"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="verifiedBy" class="form-label">
                                                Verified By
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.verifiedBy}
                                                name="verifiedBy"
                                                aria-describedby="verifiedBy"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="customer" class="form-label">
                                                Customer
                                            </label>
                                            <select
                                                name="customer"
                                                class="form-select form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-label="Default select example"
                                            >
                                                <option selected>Select Customer</option>
                                                {AllUsers?.map((item, index) => {
                                                    return (
                                                        <option
                                                            value={item._id}
                                                        >{`${item.firstName}  ${item.lastName}-${item.mobile}`}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="installmentsDate" class="form-label">
                                                Installment Date
                                            </label>
                                            <input
                                                type="date"
                                                class="form-control"
                                                defaultValue={values.installmentsDate}
                                                name="installmentsDate"
                                                aria-describedby="installmentsDate"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="fileCharges" class="form-label">
                                                File Charges
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.fileCharges}
                                                name="fileCharges"
                                                aria-describedby="fileCharges"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="gaurenterName" class="form-label">
                                                Gaurenter Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.gaurenterName}
                                                name="gaurenterName"
                                                aria-describedby="gaurenterName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                     <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="gaurenterMobileNo" class="form-label">
                                                Gaurenter Mobile
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.gaurenterMobileNo}
                                                name="gaurenterMobileNo"
                                                aria-describedby="gaurenterMobileNo"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.inputGroups}>
                                        <div class="mb-2">
                                        <label for="details" class="form-label">
                                            Details
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            defaultValue={values.details}
                                            name="details"
                                            aria-describedby="details"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonWrapper}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                        Add Loan
                                    </Button>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </div>
    );
};

export default AddLoan;
