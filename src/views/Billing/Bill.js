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
        marginBottom: '10px',
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
    listss: { flexDirection: 'row', width: '20%', marginLeft: 'auto' },
    listsss: { flexDirection: 'row', width: '20%', marginLeft: 'auto', marginBottom: '10px' },
});

// Create Document Component
const MyDocument = (props) => {
    const billDetail = props?.bill;
    const discount = props?.discount;
    const net = props?.net;
    const formData = props?.formData;

    let amount = [];
    billDetail.map((item) => {
        amount.push(Number(item.Total));
    });
    const totalAmount = amount.reduce((a, b) => a + b, 0);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.userDetails1}>
                        <Text style={styles.sections}>Shyam Enterprises</Text>
                    </View>
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
                    <View style={styles.listOuter}>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Customer Name: {formData?.customerName}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Address: {formData?.address}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Mobile No: {formData?.phone}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            {/* <Text style={styles.list}>Bill No: </Text> */}
                            <Text style={styles.list}>Bill Date: {formData?.date ? formData?.date : date}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.th1}>#</Text>
                        <Text style={styles.th}>Item Name</Text>
                        <Text style={styles.th}>Qty</Text>
                        <Text style={styles.th}>Sale Price</Text>
                        <Text style={styles.th}>Total</Text>
                    </View>
                    {billDetail
                        ? billDetail?.map((item, index) => {
                              return (
                                  <View style={styles.tableRow1}>
                                      <Text style={styles.th1}>{index + 1}</Text>
                                      <Text style={styles.th}>{item?.itemName}</Text>
                                      <Text style={styles.th}>{item?.qty}</Text>
                                      <Text style={styles.th}>{item?.salePrice}</Text>
                                      <Text style={styles.th}>{item?.Total}</Text>
                                  </View>
                              );
                          })
                        : ''}

                    <View style={styles.tableRow1}>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}>Total</Text>
                        <Text style={styles.th}>{totalAmount}</Text>
                    </View>
                    <View style={styles.tableRow1}>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}>Discount</Text>
                        <Text style={styles.th}>{discount}</Text>
                    </View>
                    <View style={styles.tableRow1}>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}>Net After Discount</Text>
                        <Text style={styles.th}>{net}</Text>
                    </View>

                    <View style={styles.privacyDetails}>
                        <Text style={styles.privacyTitle}>Terms & Conditions</Text>
                        <View>
                            <Text style={styles.desc}>1. Please check all items thoroughly before leaving the store</Text>
                            <Text style={styles.desc}>2. All items on sale are non-returnable. </Text>
                            <Text style={styles.desc}>3. All disputes subject to Abohar Jurisdiction.</Text>
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

export default function Bill(props) {
    return (
        <React.Fragment>
            <div style={styles.outer}>
                <PDFDownloadLink
                    document={<MyDocument bill={props.bill} discount={props.discount} net={props.net} formData={props.formData} />}
                    fileName="ShyamEnterprises.pdf"
                    onClick={() => {
                        console.log(props.formData, 'props.formData');
                        var myHeaders = new Headers();
                        myHeaders.append(
                            'Authorization',
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTBhMmEyZmJmNGY4NGMzYzEzNzFhMiIsImlhdCI6MTY4MDU5NTgyNywiZXhwIjoxNjg4MzcxODI3fQ.NNJrKaBEdeiD4Vg96AX09p8QiIsc_UPWD_s6HNZDaBc'
                        );
                        myHeaders.append('Content-Type', 'application/json');

                        var raw = JSON.stringify({
                            customerName: props.formData.customerName,
                            date: props.formData.date,
                            address: props.formData.address,
                            mobile: props.formData.phone,
                            item: props.bill,
                            total: Number(props.discount) + Number(props.net),
                            discount: props.discount,
                            afterDiscount: props.net,
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow',
                        };

                        fetch('http://ec2-13-233-225-31.ap-south-1.compute.amazonaws.com:5000/api/v1/bills', requestOptions)
                            .then((response) => response.json())
                            .then((result) => console.log(result))
                            .catch((error) => console.log('error', error));
                    }}
                    style={{
                        textDecoration: 'none',
                        padding: '10px 20px',
                        color: '#4a4a4a',
                        backgroundColor: '#3f51b5',
                    }}
                >
                    {/* <CloudDownloadOutlinedIcon style={styles.download} /> */}
                    <p style={styles.download}>Save</p>
                </PDFDownloadLink>
            </div>
        </React.Fragment>
    );
}
