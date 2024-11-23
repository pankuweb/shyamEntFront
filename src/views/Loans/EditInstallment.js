import React, { useReducer, useState, useEffect } from 'react';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editInstallment, loanList } from '../../actions/loan';
import { Formik } from 'formik';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import { IoMdRemove } from '@react-icons/all-files/io/IoMdRemove';
import { useParams } from 'react-router-dom';
import { APIURL } from '../../actions/config';

const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};
const EditInstallment = (props) => {
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
    const ListLoans = useSelector((state) => state.loan);
    const AllLoans = ListLoans?.list?.loan;
    const [LoanDetail, setLoanDetail] = useState();
    const { id, ins } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const dates = [];

    const classes = useStyles();
    useEffect(() => {
        dispatch(loanList());
    }, [dispatch]);

    const filteredLoan = AllLoans?.filter((item) => item._id == id);
    const editableData = filteredLoan?.[0]?.installments?.filter((item) => item._id == ins)?.[0];
    return (
        <div>
            <Grid item xs={10} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Edit Installment
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>

                    <Formik
                        initialValues={{
                            title: editableData?.title ? editableData?.title : '',
                            amount: editableData?.amount ? editableData?.amount : '',
                            date: editableData?.date ? editableData?.date : '',
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            values.insId = ins;

                            // console.log(completeArr, 'completeArr');
                            dispatch(editInstallment(values, id));
                            if (values.date !== '' && values.title !== '') {
                                setTimeout(() => {
                                    history.push(`/loan/detail/${id}`);
                                }, 3000);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form noValidate onSubmit={handleSubmit} id="json-form" className={classes.root}>
                                <Grid item xs={12} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="title" class="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            defaultValue={editableData?.title ? editableData?.title : values.title}
                                            name="title"
                                            aria-describedby="title"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="amount" class="form-label">
                                            Amount
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            defaultValue={editableData?.amount ? editableData?.amount : values.amount}
                                            name="amount"
                                            aria-describedby="amount"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="date" class="form-label">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            class="form-control"
                                            defaultValue={editableData?.date ? editableData?.date : values.date}
                                            name="date"
                                            aria-describedby="date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="user" class="form-label">
                                            Loan
                                        </label>
                                        <select
                                            name="user"
                                            class="form-select form-control"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-label="Default select example"
                                            disabled
                                        >
                                            <option selected>Select User Type</option>
                                            {AllLoans?.map((item, index) => {
                                                return (
                                                    <option
                                                        value={item._id}
                                                        selected={item._id == id ? true : false}
                                                    >{`${item?.customer?.firstName}  ${item?.customer?.lastName}`}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonWrapper}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                        Add Installment
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

export default EditInstallment;
