import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import dateFormat from 'dateformat';
import { APIURL } from '../../actions/config';
import { CBadge } from '@coreui/react';

const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};

const date = dateFormat(new Date(), 'yyyy-mm-dd');
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
    },
    userDetails1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '2px',
    },
    list: { width: '50%', fontSize: '10px' },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    sections: {
        display: 'flex',
        alignSelf: 'center',
        marginBottom: '4px',
        marginTop: '30px',
    },
    tableRow: {
        flexDirection: 'row',
        border: '0.8px solid #000',
        justifyContent: 'space-between',
        borderLeft: 'unset',
    },
    installmentRow: {
        flexDirection: 'row',
        border: '0.8px solid #000',
        justifyContent: 'space-between',
        borderLeft: 'unset',
        marginTop: '20px',
    },
    th: {
        borderLeft: '0.8px solid #000',
        fontSize: '10px',
        padding: '6px',
        width: '20%',
    },
    space: {
        fontSize: '10px',
        padding: '6px',
        width: '20%',
    },
    th1: {
        fontSize: '10px',
        padding: '10px',
    },
    tableRow1: {
        flexDirection: 'row',
        border: '0.8px solid #000',
        borderTop: 'unset',
        borderLeft: 'unset',
        justifyContent: 'space-between',
    },
    privacyTitle: {
        fontWeight: 'bold',
        fontSize: '10px',
    },
    desc: {
        fontSize: '10px',
    },
    privacyDetails: {
        marginTop: '60px',
    },
    athTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '80px',
    },
    ath: {
        fontSize: '10px',
    },
    listOuter: {
        marginBottom: '20px',
    },
    outer: { position: 'relative', fontweight: 700, lineheight: '1' },
    download: {
        display: 'contents',
        color: '#fff',
    },
    installmentDates: {
        marginTop: '30px',
        flexDirection: 'row',
        border: '0.8px solid #000',
        justifyContent: 'space-between',
    },
    image: {
        height: '100px',
        width: '100px',
        marginBottom: '10px',
    },
    title: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: '12px',
        marginTop: '30px',
        marginBottom: '4px',
    },
    titleTop: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: '12px',
        marginBottom: '4px',
    },
    listss: { flexDirection: 'row', width: '20%', marginLeft: 'auto' },
    listsss: { flexDirection: 'row', width: '20%', marginLeft: 'auto', marginBottom: '10px' },
});

// Create Document Component
const MyDocument = (props) => {
    const [LoanDetail, setLoanDetail] = useState();

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow',
        };

        fetch(`${APIURL}/api/v1/loans/${props?.loans}`, requestOptions)
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
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <Text style={styles.sections}>Shyam Enterprises</Text>
                <View style={styles.listss}>
                    <Text style={styles.ath}>Near HDFC Bank,</Text>
                </View>
                <View style={styles.listsss}>
                    <Text style={styles.ath}>Khuian Serwar</Text>
                </View>
                <View style={styles.listss}>
                    <Text style={styles.ath}>Amit Bishnoi</Text>
                </View>
                <View style={styles.listss}>
                    <Text style={styles.ath}>+91-9876563222</Text>
                </View>
                <View style={styles.listss}>
                    <Text style={styles.ath}>Ugersain</Text>
                </View>
                <View style={styles.listss}>
                    <Text style={styles.ath}>+91-9876090442</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.listOuter}>
                        {/* <View style={styles.userDetails1}>
                            <Image style={styles.image} src={dummy} alt="images" />
                        </View> */}
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Customer Name: {`${customerDetail?.firstName} ${customerDetail?.lastName}`}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Address: {customerDetail?.permanentAddress}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Mobile: {customerDetail?.mobile}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Purchasing Date: {`${dateFormat(loanReport?.createdAt, 'dd-mm-yyyy')}`}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Details: {`${loanReport?.details}`}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Gaurenter Name: {`${loanReport?.gaurenterName}`}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Gaurenter Mobile: {`${loanReport?.gaurenterMobileNo}`}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.th}>Total Bill Amount</Text>
                        <Text style={styles.th}>Down Payment</Text>
                        <Text style={styles.th}>Loan Amount</Text>
                        <Text style={styles.th}>Total Installments</Text>
                        <Text style={styles.th}>Monthly Installment</Text>
                        <Text style={styles.th}>Interest Rate</Text>
                        <Text style={styles.th}>File Charges</Text>
                        <Text style={styles.th}>Pending Amount</Text>
                        <Text style={styles.th}>Status</Text>
                    </View>
                    <View style={styles.tableRow1}>
                        <Text style={styles.th}>{loanReport?.totalBillAmount}</Text>
                        <Text style={styles.th}>{loanReport?.downPayment}</Text>
                        <Text style={styles.th}>{loanReport?.loanAmount}</Text>
                        <Text style={styles.th}>{loanReport?.termInMonth}</Text>
                        <Text style={styles.th}>{loanReport?.monthlyInstallment}</Text>
                        <Text style={styles.th}>{`${loanReport?.interest}%`}</Text>
                        <Text style={styles.th}>{loanReport?.fileCharges}</Text>
                        <Text style={styles.th}>{pendingAmount}</Text>
                        <Text style={styles.th}>{loanReport?.completed == 'false' ? 'Open' : 'Closed'}</Text>
                    </View>

                    <Text style={styles.title}>Installment Due Dates</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.th}>SR No.</Text>
                        <Text style={styles.th}>Due Date</Text>
                        <Text style={styles.th}>Due Amount</Text>
                    </View>
                    {loanReport?.installmentsDate?.map((item, index) => {
                        return (
                            <View style={styles.tableRow1}>
                                <Text style={styles.th}>{index + 1}</Text>
                                <Text style={styles.th}>{item}</Text>
                                <Text style={styles.th}>{loanReport?.monthlyInstallment}</Text>
                            </View>
                        );
                    })}
                    <Text style={styles.title}>Paid Installments</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.th}>SR No.</Text>
                        <Text style={styles.th}>Installment Amount</Text>
                        <Text style={styles.th}>Due Date</Text>
                        <Text style={styles.th}>Paid Installment</Text>
                        <Text style={styles.th}>Paid Date</Text>
                    </View>
                    {loanReport?.installments?.map((item, index) => {
                        return (
                            <View style={styles.tableRow1}>
                                <Text break style={styles.th}>
                                    {index + 1}
                                </Text>
                                <Text break style={styles.th}>
                                    {loanReport?.monthlyInstallment}
                                </Text>
                                <Text break style={styles.th}>
                                    {loanReport?.installmentsDate?.[index]}
                                </Text>
                                <Text break style={styles.th}>
                                    {item?.amount}
                                </Text>
                                <Text break style={styles.th}>
                                    {item?.date}
                                </Text>
                            </View>
                        );
                    })}

                    <View style={styles.privacyDetails}>
                        <Text style={styles.privacyTitle}>Terms & Conditions</Text>
                        <View>
                            <Text style={styles.desc}>1. It will be the responsibility of the customer to deposit the installment</Text>
                            <Text style={styles.desc}>
                                2. The guarantee of any product will be by the warranty company itself, in which the firm will not be liable
                                in any way.
                            </Text>
                            <Text style={styles.desc}>3. If the installment is late, there will be a penalty of Rs 300.</Text>
                        </View>
                    </View>
                    <View style={styles.athTitle}>
                        <Text style={styles.ath}>Authorised Signatory</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default function LoanReport(props) {
    return (
        <React.Fragment>
            <div style={styles.outer}>
                <PDFDownloadLink
                    document={<MyDocument loans={props.loans} />}
                    fileName="ShyamEnterprises.pdf"
                    style={{
                        padding: '6px 6px',
                        margin: '0px 5px',
                        color: '#fff',
                        backgroundColor: '#3f51b5',
                        borderRadius: '5px',
                        fontSize: '14px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        height: '27px',
                        textDecoration: 'none',
                    }}
                >
                    {/* <CloudDownloadOutlinedIcon style={styles.download} /> */}
                    <CBadge className="p-2" color="blue">
                        Download
                    </CBadge>
                </PDFDownloadLink>
            </div>
        </React.Fragment>
    );
}
