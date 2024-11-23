import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import dateFormat from 'dateformat';
const date = dateFormat(new Date(), 'yyyy-mm-dd');
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
    },
    userDetails: {
        flexDirection: 'row',
        marginBottom: '30px',
        marginTop: '40px',
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
        width: '100%',
        // textAlign: 'center',
        marginBottom: '40px',
    },
    tableRow: {
        flexDirection: 'row',
        border: '0.8px solid #000',
        justifyContent: 'space-between',
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
    outer: { position: 'relative' },
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
});

// Create Document Component
const MyDocument = (props) => {
    const Loans = props?.loans;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.userDetails}>
                        <Text style={styles.sections}>Shyam Enterprises</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.th1}>#</Text>
                        <Text style={styles.th}>Customer</Text>
                        <Text style={styles.th}>Total Bill Amount</Text>
                        <Text style={styles.th}>Loan Amount</Text>
                        <Text style={styles.th}>Monthly Installments</Text>
                        <Text style={styles.th}>Paid Installments</Text>
                        <Text style={styles.th}>Pending Amount</Text>
                    </View>
                    {Loans
                        ? Loans?.map((item, index) => {
                              return (
                                  <View style={styles.tableRow1}>
                                      <Text style={styles.th1}>{index + 1}</Text>
                                      <Text style={styles.th}>{`${item?.customer}`}</Text>
                                      <Text style={styles.th}>{item?.amount}</Text>
                                      <Text style={styles.th}>{item?.loanAmount}</Text>
                                      <Text style={styles.th}>{item?.monthlyInstallment}</Text>
                                      <Text style={styles.th}>{item?.paidInstallments}</Text>
                                      <Text style={styles.th}>{item?.pendingAmount}</Text>
                                  </View>
                              );
                          })
                        : ''}

                    <View style={styles.tableRow1}>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}>Total</Text>
                        <Text style={styles.th}>{Loans?.reduce((accumulator, current) => accumulator + current.paidInstallments, 0)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default function MonthlyCollection(props) {
    return (
        <React.Fragment>
            <div style={styles.outer}>
                <PDFDownloadLink
                    document={<MyDocument loans={props.loans} />}
                    fileName="ShyamEnterprises.pdf"
                    style={{
                        textDecoration: 'none',
                        padding: '10px 20px',
                        color: '#4a4a4a',
                        backgroundColor: '#3f51b5',
                        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                        borderRadius: '5px',
                    }}
                >
                    {/* <CloudDownloadOutlinedIcon style={styles.download} /> */}
                    <p style={styles.download}>DOWNLOAD REPORTS</p>
                </PDFDownloadLink>
            </div>
        </React.Fragment>
    );
}
