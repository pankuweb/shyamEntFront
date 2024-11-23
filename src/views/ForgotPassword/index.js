import React, { useReducer, useState } from 'react';
import { Card, CardContent, Divider, Typography, makeStyles, Grid, TextField, Paper, Button } from '@material-ui/core';
import { editAdmin, login } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const ForgotPassword = (props) => {
    const useStyles = makeStyles((theme) => ({
        card: {
            overflow: 'visible',
            display: 'flex',
            position: 'relative',
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%',
                width: '50%',
            },
            maxWidth: '475px',
            margin: '24px auto',
        },
        content: {
            padding: '0px',
        },
        root: {
            height: '100vh',
            minHeight: '100%',
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
        form: {
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
    }));

    const dispatch = useDispatch();
    let history = useHistory();
    const [confirmpass, setConfirmpass] = useState();
    const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
        password: '',
    });
    const handleSubmit = (evt) => {
        evt.preventDefault();
        let data = { formInput };
        if (confirmpass == formInput.password) {
            dispatch(editAdmin(data));
            setTimeout(() => {
                localStorage.clear();
                history.push('/login');
            }, 2000);
        } else {
            toast.error('Password Does not match!');
        }
    };

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };

    const confirmPassword = (e) => {
        setConfirmpass(e.target.value);
    };

    const classes = useStyles();
    return (
        <div>
            <ToastContainer autoClose={2000} />
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <Grid item xs={11} sm={7} md={6} lg={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.content} style={{ padding: '0px ' }}>
                            <Typography variant="h5" component="h3" className={classes.formTitle}>
                                Change Your Password
                            </Typography>
                            <Typography component="p">{props.formDescription}</Typography>

                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        id="margin-normal"
                                        name="password"
                                        defaultValue={formInput.password}
                                        className={classes.textField}
                                        onChange={handleInput}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        id="margin-normal"
                                        name="confirmPassword"
                                        defaultValue={formInput.password}
                                        className={classes.textField}
                                        onChange={confirmPassword}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonWrapper}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '20px', width: '200px', borderRadius: '0px' }}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default connect(null, { login })(ForgotPassword);
