import React, { useReducer } from 'react';
import { Card, CardContent, Divider, Typography, makeStyles, Grid, TextField, Paper, Button } from '@material-ui/core';
import { login } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';

const Login = (props) => {
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

    const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
        email: '',
        password: '',
    });
    const handleSubmit = (evt) => {
        evt.preventDefault();

        let data = { formInput };
        dispatch(login(data));
        setTimeout(() => {
            if (localStorage.getItem('token')) {
                history.push('/dashboard');
            }
        }, 3000);
    };

    const handleInput = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
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
                                Login Account
                            </Typography>
                            <Typography component="p">{props.formDescription}</Typography>

                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        id="margin-normal"
                                        name="email"
                                        defaultValue={formInput.email}
                                        className={classes.textField}
                                        onChange={handleInput}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        id="margin-normal"
                                        name="password"
                                        defaultValue={formInput.password}
                                        className={classes.textField}
                                        onChange={handleInput}
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

export default connect(null, { login })(Login);
