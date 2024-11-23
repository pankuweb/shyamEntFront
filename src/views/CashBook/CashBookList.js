import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Card, Grid, CardContent, Button } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.css';
import { CNavLink, CBadge } from '@coreui/react';
import { CDataTable } from '@coreui/react';
import { cashbookList, deleteCashBook } from '../../actions/cashbook';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';

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

const CashBookList = () => {
    const ListCashbook = useSelector((state) => state.cashbook);
    const AllCashbook = ListCashbook?.list?.cashbook;
    const dispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();

    const usersData = AllCashbook?.map((item, index) => {
        return {
            title: item?.title,
            date: dateFormat(item?.date, 'yyyy-mm-dd'),
            debit: item?.debit,
            credit: item?.credit,
            total: item?.total,
            Action: item,
        };
    });

    const fields = [
        { key: 'title', _style: { width: '10%' } },
        { key: 'date', _style: { width: '10%' } },
        { key: 'debit', _style: { width: '10%' } },
        { key: 'credit', _style: { width: '10%' } },
        { key: 'total', _style: { width: '10%' } },
        {
            key: 'Action',
            _style: { width: '10%' },
        },
    ];

    useEffect(() => {
        dispatch(cashbookList());
    }, [dispatch]);

    const add = () => {
        history.push(`/cash-book`);
    };
    const TotalDebitAmounts = AllCashbook?.reduce((accumulator, current) => accumulator + Number(current.debit), 0);
    const TotalCreditAmounts = AllCashbook?.reduce((accumulator, current) => accumulator + Number(current.credit), 0);
    const GrandTotal = AllCashbook?.reduce((accumulator, current) => accumulator + Number(current.total), 0);

    const getId = (_id) => {
        return _id;
    };

    const deleteTransition = (id) => {
        dispatch(deleteCashBook(getId(id)));
        setTimeout(() => {
            dispatch(cashbookList());
        }, 2000);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" className="mb-3" onClick={add}>
                    Add
                </Button>
                <Card>
                    <h3 className={classes.title}>CashBook</h3>
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
                                    <td className="py-2 d-flex">
                                        <CNavLink className="p-0" to="" onClick={() => deleteTransition(item?.Action?._id)}>
                                            <CBadge className="p-2" color="danger">
                                                Delete
                                            </CBadge>
                                        </CNavLink>
                                    </td>
                                ),
                            }}
                        />
                        <Grid item xs={12} className={classes.filterInputs}>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Grid item xs={6} className={classes.filterInputs}></Grid>
                                <Grid item xs={6} className={classes.filterInputs}>
                                    <table class="table table-bordered table-sm">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <b>Total Debit</b>
                                                </td>
                                                <td>{TotalDebitAmounts ? TotalDebitAmounts : 0}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Total Credit</b>
                                                </td>
                                                <td>{TotalCreditAmounts ? TotalCreditAmounts : 0}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Grand Total</b>
                                                </td>
                                                <td>{GrandTotal ? GrandTotal : 0}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default connect(null, { cashbookList })(CashBookList);
