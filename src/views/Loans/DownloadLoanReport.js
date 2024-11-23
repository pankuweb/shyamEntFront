import React, { useReducer, useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import dateFormat from 'dateformat';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';
import { APIURL } from '../../actions/config';
import { useParams } from 'react-router-dom';
import LoanReport from '../Reports/LoanReport';
import { Card, Grid, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import dummy from './../../images/profile.webp';
const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};

const date = dateFormat(new Date(), 'yyyy-mm-dd');
// Create styles
const useStyles = makeStyles({
    title: {
        background: '#3f51b5',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
    },
    details: {
        margin: '0px',
    },
});

// Create Document Component
const DownloadLoanReport = () => {
    const classes = useStyles();

    const { id } = useParams();

    const [LoanDetail, setLoanDetail] = useState();

    useEffect(() => {
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
    }, []);

    const loanReport = LoanDetail?.loan?.[0];
    const customerDetail = loanReport?.customer;
    const total = (loanReport?.loanAmount / 100) * loanReport?.interest;
    const Installments = loanReport?.installments?.reduce((accumulator, current) => accumulator + current.amount, 0);
    const pendingAmount = loanReport?.loanAmount + total - Installments;
    return (
        <div>
            <Card>
                <h3 className={classes.title}>
                    Loan Report{' '}
                    {`${customerDetail?.firstName ? `of  ${customerDetail?.firstName}` : ''} ${
                        customerDetail?.lastName ? customerDetail?.lastName : ''
                    }`}
                </h3>
                <CardContent className="p-2">
                    <Grid item xs={1}>
                        <LoanReport loans={id} />
                    </Grid>
                    <Grid item xs={12} className="mt-3">
                        <img src={customerDetail?.photo ? customerDetail?.photo : dummy} alt="images" className="profile-pic" />
                        <p className={classes.details}>
                            Customer Name:{' '}
                            {`${customerDetail?.firstName ? customerDetail?.firstName : ''} ${
                                customerDetail?.lastName ? customerDetail?.lastName : ''
                            }`}
                        </p>
                        <p className={classes.details}>
                            Address: {customerDetail?.permanentAddress ? customerDetail?.permanentAddress : ''}
                        </p>
                        <p className={classes.details}>Mobile: {customerDetail?.mobile ? customerDetail?.mobile : ''}</p>
                        <p className={classes.details}>Details: {loanReport?.details ? loanReport?.details : ''}</p>
                        <p className={classes.details}>Gaurenter Name: {loanReport?.gaurenterName ? loanReport?.gaurenterName : ''}</p>
                        <p className={classes.details}>Gaurenter Mobile: {loanReport?.gaurenterMobileNo ? loanReport?.gaurenterMobileNo : ''}</p>
                    </Grid>
                    <div class="wrapper loan-data-report">
                        <div class="container">
                            <div class="Amount">
                                <h5 className="mt-0 mb-2 text-center">Loan Details</h5>
                                <table>
                                    <tr>
                                        <th>Total Bill Amount</th>
                                        <th>Down Pay-ment</th>
                                        <th>Loan Amount</th>
                                        <th>Total Installment</th>
                                        <th>Monthly Installment</th>
                                        <th>Interest Rate</th>
                                        <th>File Charges</th>
                                        <th>Panding Amount</th>
                                        <th>Status</th>
                                    </tr>
                                    <tr>
                                        <td>{loanReport?.totalBillAmount}</td>
                                        <td>{loanReport?.downPayment}</td>
                                        <td>{loanReport?.loanAmount}</td>
                                        <td>{loanReport?.termInMonth}</td>
                                        <td>{loanReport?.monthlyInstallment}</td>
                                        <td>{`${loanReport?.interest}%`}</td>
                                        <td>{loanReport?.fileCharges}</td>
                                        <td>{pendingAmount}</td>
                                        <td>{loanReport?.completed == 'false' ? 'Open' : 'Closed'}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="Insallments">
                                <h5 className="mt-4 mb-2 text-center">Insallments Due Dates</h5>
                                <table>
                                    <tr>
                                        <th>SR NO.</th>
                                        <th>Due Date</th>
                                        <th>Due Amount</th>
                                    </tr>
                                    {loanReport?.installmentsDate?.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item}</td>
                                                <td>{loanReport?.monthlyInstallment}</td>
                                            </tr>
                                        );
                                    })}
                                </table>
                                <div class="paid mb-5">
                                    <h5 className="mt-4 mb-2 text-center">Paid Installment</h5>
                                    <table>
                                        <tr>
                                            <th>SR NO.</th>
                                            <th>Installment Amount</th>
                                            <th>Due Date</th>
                                            <th>Paid Installment</th>
                                            <th>Paid Date</th>
                                        </tr>
                                        {loanReport?.installments?.length ? (
                                            loanReport?.installments?.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{loanReport?.monthlyInstallment}</td>
                                                        <td>{loanReport?.installmentsDate?.[index]}</td>
                                                        <td>{item?.amount}</td>
                                                        <td>{item?.date}</td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <p className="m-0 pt-2 pb-2">No Installments Paid Yet</p>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
export default DownloadLoanReport;
