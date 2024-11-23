import React, { useReducer, useState, useEffect } from 'react';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { addBook } from '../../actions/book';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};
const CashBookEdit = (props) => {
        const { id } = useParams();
    const [BookData, setBookData] = useState();
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
    
useEffect(() => { 
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer null");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://ec2-13-233-225-31.ap-south-1.compute.amazonaws.com:5000/api/v1/book/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => setBookData(result?.data?.book))
  .catch(error => console.log('error', error));
}, [])
    
const saveData = () => { 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer null");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "title": title ? title : BookData?.title,
    "pending": debit ? debit : BookData?.pending,
    "customer": customer ? customer : BookData?.customer,
    "mobile": mobile ? mobile : BookData?.customer
    });

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`http://ec2-13-233-225-31.ap-south-1.compute.amazonaws.com:5000/api/v1/book/${id}`, requestOptions)
    .then(response => response.text())
        .then(result => { 
            toast.success('Data updated successfully!');
            setTimeout(() => {
                history.push(`/book-list`);
            }, 3000);
        })
    .catch(error => console.log('error', error));
}
    
    return (
        <div>
            <Grid item xs={8} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Edit Book
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>

                    <Formik
                        initialValues={{
                            title: title,
                            pending: debit ? debit : 0,
                            customer: customer,
                            mobile: mobile
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            // if (values.date !== '' && values.date !== undefined) {
                            //     dispatch(addBook(values));
                            //     setTimeout(() => {
                            //         history.push(`/book-list`);
                            //     }, 3000);
                            // } else {
                            //     toast.error('Please select all fields!');
                            // }
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
                                            defaultValue={BookData?.title ? BookData?.title : values.title}
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
                                            type="text"
                                            class="form-control"
                                            defaultValue={BookData?.date ? new Date(BookData?.date): ''}
                                            name="date"
                                            aria-describedby="date"
                                            onChange={handleDate}
                                            onBlur={handleBlur}
                                            disabled
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
                                            defaultValue={BookData?.customer ? BookData?.customer : customer}
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
                                            defaultValue={BookData?.mobile ? BookData?.mobile : mobile}
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
                                            defaultValue={BookData?.pending ? BookData?.pending : debit}
                                            name="debit"
                                            aria-describedby="debit"
                                            onChange={handleDebit}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonWrapper}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={() => {
                                        saveData();
                                     }}>
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

export default CashBookEdit;
