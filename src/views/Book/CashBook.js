import React, { useReducer, useState, useEffect } from 'react';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { addBook } from '../../actions/book';
import { toast } from 'react-toastify';

const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};
const CashBook = (props) => {
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

    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [credit, setCredit] = useState();
    const [debit, setDebit] = useState();
    const [customer, setcustomer] = useState();
    const [mobile, setmobile] = useState();

    const dispatch = useDispatch();
    let history = useHistory();

    const classes = useStyles();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleDate = (e) => {
        setDate(e.target.value);
    };
    const handleDebit = (e) => {
        setDebit(e.target.value);
    };
    const handleCustomer = (e) => {
        setcustomer(e.target.value);
    };
const handleMobile = (e) => {
        setmobile(e.target.value);
    };
    return (
        <div>
            <Grid item xs={8} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Book
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>

                    <Formik
                        initialValues={{
                            title: title,
                            date: date,
                            pending: debit ? debit : 0,
                            customer: customer,
                            mobile: mobile
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            if (values.date !== '' && values.date !== undefined) {
                                dispatch(addBook(values));
                                setTimeout(() => {
                                    history.push(`/book-list`);
                                }, 3000);
                            } else {
                                toast.error('Please select all fields!');
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
                                            defaultValue={values.title}
                                            name="title"
                                            aria-describedby="title"
                                            onChange={handleTitle}
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
                                            defaultValue={values.date}
                                            name="date"
                                            aria-describedby="date"
                                            onChange={handleDate}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="debit" class="form-label">
                                            Customer
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            defaultValue={customer}
                                            name="debit"
                                            aria-describedby="debit"
                                            onChange={handleCustomer}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="debit" class="form-label">
                                            Mobile
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            defaultValue={mobile}
                                            name="debit"
                                            aria-describedby="debit"
                                            onChange={handleMobile}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="debit" class="form-label">
                                            Pending
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            defaultValue={debit}
                                            name="debit"
                                            aria-describedby="debit"
                                            onChange={handleDebit}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonWrapper}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                        Save
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

export default CashBook;
