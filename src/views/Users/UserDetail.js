import React, { useReducer, useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loanList } from '../../actions/loan';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useHistory } from 'react-router-dom';
import { APIURL } from '../../actions/config';
import Bill from '../Billing/Bill';
const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};

const UserDetail = (props) => {
    const useStyles = makeStyles((theme) => ({
        formTitle: {
            padding: theme.spacing(1, 2),
            background: '#3f51b5',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        inputGroups: {
            padding: theme.spacing(0.5, 1),
            display: 'flex',
        },
        margin0: {
            margin: '0px',
        },
        installments: {
            marginTop: '20px',
        },
        installment: {
            marginTop: '30px',
            display: 'flex',
            padding: '10px',
        },
        card: {
            marginTop: '50px',
        },
        cardcompleted: {
            width: '26%',
            margin: '0 auto',
        },
        title: {
            textAlign: 'center',
            padding: '16px !important',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#198754',
        },
        cancelTitle: {
            textAlign: 'center',
            padding: '16px !important',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#FF0000',
        },
        completedIcon: {
            marginRight: '6px',
        },
        crossIcon: {
            marginRight: '6px',
        },
        downloadBtn: {
            cursor: 'pointer',
        },
        secTitle: {
            margin: '10px 5px 5px',
            fontSize: '18px',
            fontWeight: '600',
        },
        profile: {
            width: '100px',
            margin: '0 auto',
            marginBottom: '30px',
            height: '100px',
        },
        profileImg: {
            width: '100px',
            height: '100px',
            margin: '0 auto',
            display: 'flex',
        },
        details: {
            margin: '20px auto',
            display: 'flex',
            justifyContent: 'center',
        },
        card: {
            margin: '0px 10px',
        },
        profileCard: {
            padding: '20px',
        },
        Paper: {
            height: '400px',
            padding: '20px',
        },
        Papers: {
            height: '200px',
            padding: '20px',
        },
    }));
    const { id } = useParams();

    const [UserDetail, setUserDetail] = useState();
    const User = UserDetail?.data?.user;
    const classes = useStyles();

    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow',
        };

        fetch(`${APIURL}/api/v1/users/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUserDetail(result);
            });
        dispatch(loanList());
    }, [dispatch]);

    return (
        <div>
            <Grid item xs={12} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Customer Details
                    </Typography>
                </Paper>
                <Grid item xs={12} style={{ padding: '20px 0px', display: 'flex' }}>
                    <Grid item xs={4} className={classes.profile}>
                        <Paper className={classes.Papers}>
                            <p style={{ textAlign: 'center' }}>
                                <b>Customer Photo</b>
                            </p>
                            <img src={User?.photo} className={classes.profileImg} />
                        </Paper>
                    </Grid>
                    <Grid item xs={8} className={classes.card}>
                        <Paper className={classes.Paper}>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Name</b>
                                </p>
                                :{`${User?.firstName} ${User?.lastName}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Adhar No</b>
                                </p>
                                :{`${User?.adharNo}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Date of Birth</b>
                                </p>
                                :{`${User?.dob}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Mobile</b>
                                </p>
                                :{`${User?.mobile}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Relative</b>
                                </p>
                                :{`${User?.relativeFirstName} ${User?.relativeLastName}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Relation</b>
                                </p>
                                :{`${User?.relation}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>State</b>
                                </p>
                                :{`${User?.state}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Distt.</b>
                                </p>
                                :{`${User?.distt}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>City</b>
                                </p>
                                :{`${User?.city}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Pin Code</b>
                                </p>
                                :{`${User?.pinCode}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Correspondence Address</b>
                                </p>
                                :{`${User?.correspondAddress}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Permanant Address</b>
                                </p>
                                :{`${User?.permanentAddress}`}
                            </Grid>
                            <Grid item xs={12} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Near About</b>
                                </p>
                                :{`${User?.nearAbout}`}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserDetail;
