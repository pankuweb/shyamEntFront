import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Card, Divider, Grid, CardContent, Button } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { gridSpacing } from '../../store/constant';
import { deleteUser, userList } from '../../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.css';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { CNavLink, CBadge, CRow, CCol, CCard, CButton, CCollapse, CCardBody } from '@coreui/react';
import { CDataTable } from '@coreui/react';
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
});

const UserList = () => {
    const ListUsers = useSelector((state) => state.user);
    const AllUsers = ListUsers?.list?.user?.filter((item) => !item.email);
    const dispatch = useDispatch();
    const classes = useStyles();

    const usersData = AllUsers?.map((item, index) => {
        return {
            FirstName: item.firstName,
            LastName: item.lastName,
            PhoneNo: item.mobile,
            AdharNo: item.adharNo,
            State: item.state,
            City: item.city,
            Action: item._id,
        };
    });

    const getId = (_id) => {
        return _id;
    };
    const removeUser = (id) => {
        dispatch(deleteUser(getId(id)));
        setTimeout(() => {
            dispatch(userList());
        }, 2000);
    };
    const fields = [
        { key: 'FirstName', _style: { width: '10%' } },
        { key: 'LastName', _style: { width: '10%' } },
        { key: 'PhoneNo', _style: { width: '10%' } },
        { key: 'AdharNo', _style: { width: '10%' } },
        { key: 'State', _style: { width: '10%' } },
        { key: 'City', _style: { width: '10%' } },

        {
            key: 'Action',
            _style: { width: '10%' },
            sorter: false,
            filter: false,
        },
    ];

    useEffect(() => {
        dispatch(userList());
    }, [dispatch]);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <h3 className={classes.title}>All Customers</h3>
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
                                        <CNavLink className="p-0" to={`/customers/detail/${item.Action}`}>
                                            <CBadge className="p-2" color="dark">
                                                View
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0 mx-2" to={`/customers/edit-customer/${item.Action}`}>
                                            <CBadge className="p-2" color="success">
                                                Edit
                                            </CBadge>
                                        </CNavLink>
                                        <CNavLink className="p-0" to="/customers/list" onClick={() => removeUser(item.Action)}>
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

export default connect(null, { userList })(UserList);
