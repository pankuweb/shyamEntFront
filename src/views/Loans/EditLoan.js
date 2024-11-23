import React, { useReducer, useState, useEffect } from 'react';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editLoan } from '../../actions/loan';
import { Formik } from 'formik';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import { IoMdRemove } from '@react-icons/all-files/io/IoMdRemove';
import { userList } from '../../actions/user';
import { APIURL } from '../../actions/config';
import { useParams } from 'react-router-dom';

const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};

const EditLoan = (props) => {
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
    const ListUsers = useSelector((state) => state.user);
    const AllUsers = ListUsers?.list?.user?.filter((item) => !item.email);

    const dispatch = useDispatch();
    const { id } = useParams();
    let history = useHistory();
    const dates = [];
    const [LoanDetail, setLoanDetail] = useState();
    const LoanData = LoanDetail?.loan?.[0];
    const classes = useStyles();
    const test = [];

    useEffect(() => {
        dispatch(userList());
        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow',
        };

        fetch(`${APIURL}/api/v1/loans/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoanDetail(result.data);
            });
    }, [dispatch]);

    /////
    const [inputLists, setInputList] = useState([{ installmentsDate: '' }]);
    const [terminMonth, setTerminMonth] = useState();
    const [loanAmt, setloanAmt] = useState();
    const [installmentAmount, setInstallmentAmount] = useState();
    const [interestVal, setInterestVal] = useState();
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputLists];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputLists];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputLists, { installmentsDate: '' }]);
    };

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
    const installmentsDatess = inputLists?.map((item) => dates.push(item.installmentsDate));

    const et = LoanData?.installmentsDate.map((item) => test.push({ installmentsDate: item }));
    return (
        <div>
            <Grid item xs={10} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Edit Loan
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>

                    <Formik
                        initialValues={{
                            totalBillAmount: LoanData?.totalBillAmount,
                            downPayment: LoanData?.downPayment,
                            loanAmount: loanAmt ? loanAmt : LoanData?.loanAmount,
                            termInMonth: terminMonth ? terminMonth : LoanData?.termInMonth,
                            interest: interestVal ? interestVal : LoanData?.interest,
                            monthlyInstallment: installmentAmount ? installmentAmount : LoanData?.monthlyInstallment,
                            verifiedBy: LoanData?.verifiedBy,
                            customer: LoanData?.customer?._id,
                            installmentsDate: LoanData?.installmentsDate[0],
                            fileCharges: LoanData?.fileCharges,
                            details: LoanData?.details,
                            gaurenterName: LoanData?.gaurenterName,
                            gaurenterMobileNo: LoanData?.gaurenterMobileNo,
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            dispatch(editLoan(values, id));
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
                                                defaultValue={values.totalBillAmount ? values.totalBillAmount : LoanData?.totalBillAmount}
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
                                                defaultValue={values.downPayment ? values.downPayment : LoanData?.downPayment}
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
                                                defaultValue={loanAmt ? loanAmt : LoanData?.loanAmount}
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
                                                defaultValue={terminMonth ? terminMonth : LoanData?.termInMonth}
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
                                                defaultValue={interestVal ? interestVal : LoanData?.interest}
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
                                                value={installmentAmount ? installmentAmount : LoanData?.monthlyInstallment}
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
                                                defaultValue={values.verifiedBy ? values.verifiedBy : LoanData?.verifiedBy}
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
                                                            selected={LoanData?.customer?._id === item?._id ? true : false}
                                                        >{`${item.firstName}  ${item.lastName}`}</option>
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
                                                defaultValue={
                                                    values.installmentsDate ? values.installmentsDate : LoanData?.installmentsDate[0]
                                                }
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
                                                defaultValue={values.fileCharges ? values.fileCharges : LoanData?.fileCharges}
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
                                                defaultValue={values.gaurenterName ? values.gaurenterName : LoanData?.gaurenterName}
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
                                                defaultValue={values.gaurenterMobileNo ? values.gaurenterMobileNo : values.gaurenterMobileNo}
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
                                        Edit Loan
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

export default EditLoan;
