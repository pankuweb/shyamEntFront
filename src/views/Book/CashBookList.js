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
import { bookList, deleteBook } from '../../actions/book';
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

const BookList = () => {
    const ListCashbook = useSelector((state) => state.book);
    
    const AllCashbook = ListCashbook?.list?.book;
    const dispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();

    const usersData = AllCashbook?.map((item, index) => {
        return {
            title: item?.title,
            date: dateFormat(item?.date, 'yyyy-mm-dd'),
            customer: item?.customer,
            pending: item?.pending,
            mobile: item?.mobile,
            Action: item,
        };
    });
    const fields = [
        { key: 'title', _style: { width: '10%' } },
        { key: 'date', _style: { width: '10%' } },
        { key: 'customer', _style: { width: '10%' } },
        { key: 'mobile', _style: { width: '10%' } },
        { key: 'pending', _style: { width: '10%' } },
        {
            key: 'Action',
            _style: { width: '10%' },
        },
    ];

    useEffect(() => {
        dispatch(bookList());
    }, [dispatch]);

    const add = () => {
        history.push(`/book/cash-book`);
    };

    const getId = (_id) => {
        return _id;
    };

    const deleteTransition = (id) => {
        dispatch(deleteBook(getId(id)));
        setTimeout(() => {
            dispatch(bookList());
        }, 2000);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" className="mb-3" onClick={add}>
                    Add
                </Button>
                <Card>
                    <h3 className={classes.title}>Book</h3>
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
                                        <CNavLink className="p-0 mr-2" to={`/cash-book-edit/${item?.Action?._id}`}>
                                            <CBadge className="p-2" color="success">
                                                Edit
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0" to="" onClick={() => deleteTransition(item?.Action?._id)}>
                                            <CBadge className="p-2" color="danger">
                                                Delete
                                            </CBadge>
                                        </CNavLink>
                                    </td>
                                ),
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default connect(null, { bookList })(BookList);
