import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Card, Grid, CardContent, Button } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.css';
import { CDataTable } from '@coreui/react';
import { cashbookList } from '../../actions/cashbook';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { toast } from 'react-toastify';

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
const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    imgproduct: {
        width: '20px',
        height: 'auto',
    },
    title: {
        background: '#3f51b5',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
    },
    view: {
        background: '#eee',
        color: '#fff',
    },
    edit: { background: '#4CAF50', color: '#fff' },
    delete: { background: '#d11a2a', color: '#fff' },
    icons: {
        width: '18px',
        height: '18px',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    filterInputs: {
        margin: '0px 10px ',
    },
    button: {
        padding: '5px',
    },
});

// Create Document Component
const MyDocument = (props) => {
    const billDetail = props?.formData;
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
                            <Text style={styles.list}>Customer Name: {billDetail?.customerName}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Address: {billDetail?.address}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            <Text style={styles.list}>Mobile No: {billDetail?.mobile}</Text>
                        </View>
                        <View style={styles.userDetails1}>
                            {/* <Text style={styles.list}>Bill No: </Text> */}
                            <Text style={styles.list}>Bill Date: {billDetail?.date ? billDetail?.date : ''}</Text>
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
                        ? billDetail?.item?.map((item, index) => {
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
                        <Text style={styles.th}>{props?.total}</Text>
                    </View>
                    <View style={styles.tableRow1}>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}>Discount</Text>
                        <Text style={styles.th}>{props?.discount}</Text>
                    </View>
                    <View style={styles.tableRow1}>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}></Text>
                        <Text style={styles.space}>Net After Discount</Text>
                        <Text style={styles.th}>{Number(props?.total) - Number(props?.discount)}</Text>
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

const CashBookList = () => {
    const [Bills, setBills] = useState();
    const dispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();

    const [data, setData] = useState();
    const deleteTransition = (id) => {
        if (window.confirm('Do you want to delete data')) {
            var myHeaders = new Headers();
            myHeaders.append(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTBhMmEyZmJmNGY4NGMzYzEzNzFhMiIsImlhdCI6MTY4MDU5NTgyNywiZXhwIjoxNjg4MzcxODI3fQ.NNJrKaBEdeiD4Vg96AX09p8QiIsc_UPWD_s6HNZDaBc'
            );

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow',
            };

            fetch(`http://ec2-13-233-225-31.ap-south-1.compute.amazonaws.com:5000/api/v1/bills/${id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status == 'success') {
                        toast.success(result?.message);
                        setData(result);
                    }
                })
                .catch((error) => console.log('error', error));
        }
    };

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTBhMmEyZmJmNGY4NGMzYzEzNzFhMiIsImlhdCI6MTY4MDU5NTgyNywiZXhwIjoxNjg4MzcxODI3fQ.NNJrKaBEdeiD4Vg96AX09p8QiIsc_UPWD_s6HNZDaBc'
        );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch('http://ec2-13-233-225-31.ap-south-1.compute.amazonaws.com:5000/api/v1/bills', requestOptions)
            .then((response) => response.json())
            .then((result) => setBills(result?.data?.bill))
            .catch((error) => console.log('error', error));
    }, [data]);

    const usersData = Bills?.map((item, index) => {
        console.log(item)
        return {
            customer: item?.customerName,
            date: dateFormat(item?.date, 'yyyy-mm-dd'),
            address: item?.address,
            mobile: item?.mobile,
            total:item?.item?.reduce((total, currentItem) => {
            return total + parseInt(currentItem.salePrice);
            }, 0),
            discount: item?.discount ? item?.discount : 0,
            Action: item,
        };
    });

    const fields = [
        { key: 'customer', _style: { width: '10%' } },
        { key: 'date', _style: { width: '10%' } },
        { key: 'mobile', _style: { width: '10%' } },
        { key: 'address', _style: { width: '10%' } },
        {
            key: 'Action',
            _style: { width: '10%' },
        },
    ];

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <h3 className={classes.title}>Bills</h3>
                    <CardContent className="p-2">
                        <CDataTable
                            items={usersData}
                            fields={fields}
                            tableFilter
                            itemsPerPageSelect
                            itemsPerPage={50}
                            sorter
                            pagination
                            scopedSlots={{
                                Action: (item) => (
                                    <>
                                        <td className="py-2 d-flex">
                                            <PDFDownloadLink
                                                fileName="ShyamEnterprises.pdf"
                                                // onClick={() => {
                                                //     deleteTransition(item?.Action?._id);
                                                // }}
                                                document={
                                                    <MyDocument
                                                        bill={item?.Action?.item}
                                                        discount={item?.discount}
                                                        net={item?.Action?.afterDiscount}
                                                        formData={item?.Action ? item?.Action : ''}
                                                        total={ item?.total ? item?.total : ''}
                                                    />
                                                }
                                                style={{
                                                    textDecoration: 'none',
                                                    padding: '4px 10px',
                                                    color: '#4a4a4a',
                                                    backgroundColor: '#3f51b5',
                                                }}
                                            >
                                                {/* <CloudDownloadOutlinedIcon style={styles.download} /> */}
                                                <p style={styles.download}>Download</p>
                                            </PDFDownloadLink>
                                            <button
                                                onClick={() => {
                                                    deleteTransition(item?.Action?._id);
                                                }}
                                                style={{ background: 'rgb(218 47 47)', color: '#fff', marginLeft: '10px', border: 'none' }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                ),
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default connect(null, { cashbookList })(CashBookList);
