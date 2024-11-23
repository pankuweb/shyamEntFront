import React, { useReducer, useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteInstallment, loanList } from '../../actions/loan';
import { CNavLink, CBadge } from '@coreui/react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { useHistory } from 'react-router-dom';
import { APIURL } from '../../actions/config';
const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};

const LoanDetails = () => {
    const useStyles = makeStyles((theme) => ({
        formTitle: {
            padding: theme.spacing(1, 2),
            textAlign: 'center',
            background: '#3f51b5',
            color: '#fff',
        },
        inputGroups: {
            padding: theme.spacing(1, 1),
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
        completedIcon: {
            marginRight: '6px',
        },
        image: {
            height: '150px',
            width: '150px',
        },
    }));
    const { id } = useParams();

    const ListLoans = useSelector((state) => state.loan);
    const userLoan = ListLoans?.list?.loan?.filter((item) => item._id == id);
    const classes = useStyles();
    const User = userLoan?.[0]?.customer;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loanList());
    }, [dispatch]);
    const deleteIns = (loanId, insId) => {
        dispatch(deleteInstallment(loanId, insId));

        setTimeout(() => {
            dispatch(loanList());
        }, 1000);
    };

    return (
        <div>
            <Grid item xs={12} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Loan Details
                    </Typography>
                    <Grid item xs={12} style={{ padding: '20px 0px' }}>
                        <Grid item xs={12} style={{ padding: '20px 0px' }}>
                            <img className={classes.image} src={User?.photo} />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex' }}>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Name</b>
                                </p>
                                :{`${User?.firstName} ${User?.lastName}`}
                            </Grid>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Adhar No</b>
                                </p>
                                :{`${User?.adharNo}`}
                            </Grid>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Address</b>
                                </p>
                                :{`${User?.permanentAddress}`}
                            </Grid>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Mobile</b>
                                </p>
                                :{`${User?.mobile}`}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex' }}>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Total Amount</b>
                                </p>
                                :{`${userLoan?.[0]?.totalBillAmount}`}
                            </Grid>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Down Payment</b>
                                </p>
                                :{`${userLoan?.[0]?.downPayment ? userLoan?.[0]?.downPayment : 0}`}
                            </Grid>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Loan Amount</b>
                                </p>
                                :{`${userLoan?.[0]?.loanAmount}`}
                            </Grid>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Total Installments</b>
                                </p>
                                :{`${userLoan?.[0]?.termInMonth}`}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex' }}>
                            <Grid item xs={3} className={classes.inputGroups}>
                                <p className={classes.margin0}>
                                    <b>Installment Date</b>
                                </p>
                                :{`${userLoan?.[0]?.installmentsDate?.map((item) => item)}`}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                {userLoan?.[0]?.installments?.length ? (
                    <Paper className={classes.installments}>
                        <Typography variant="h5" component="h3" className={classes.formTitle}>
                            Paid Installments
                        </Typography>
                    </Paper>
                ) : (
                    ''
                )}

                <Grid item xs={12} className={classes.installments}>
                    {userLoan?.[0]?.installments?.map((item, index) => {
                        return (
                            <Paper>
                                <Grid item xs={12} className={classes.installment}>
                                    <Grid item xs={4}>
                                        {item.title}
                                    </Grid>
                                    <Grid item xs={4}>
                                        {item.amount}
                                    </Grid>
                                    <Grid item xs={4}>
                                        {item.date}
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="d-flex">
                                            <CNavLink className="p-0  mx-1" to={`/loan/edit-installment/${id}/${item._id}`}>
                                                <CBadge className="p-2" color="success">
                                                    Edit
                                                </CBadge>
                                            </CNavLink>
                                            <CNavLink className="p-0 mx-1">
                                                <button className="p-0 border-0">
                                                    <CBadge
                                                        className="p-2"
                                                        color="danger"
                                                        onClick={() => {
                                                            deleteIns(id, item._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </CBadge>
                                                </button>
                                            </CNavLink>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        );
                    })}
                </Grid>
                {userLoan?.[0]?.pendingPayment == 0 ? (
                    <Grid item xs={12} className={classes.card}>
                        <Card className={classes.cardcompleted}>
                            <CardContent className={classes.title}>
                                <CheckCircleOutlinedIcon className={classes.completedIcon} />
                                Completed
                            </CardContent>
                        </Card>
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
        </div>
    );
};

export default LoanDetails;
