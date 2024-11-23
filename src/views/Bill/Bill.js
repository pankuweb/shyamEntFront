import React, { useReducer, useState, useEffect } from 'react';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLoan } from '../../actions/loan';
import { Formik } from 'formik';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import { IoMdRemove } from '@react-icons/all-files/io/IoMdRemove';
import { userList } from '../../actions/user';
import NavItem from '../../layout/MainLayout/Sidebar/MenuList/NavItem';
import Bills from './../Billing/Bill';

import './style.css';
const Bill = (props) => {
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: '0px',
            width: '72px',
            height: '36px',
            borderRadius: '0px',
            textTransform: 'Capitalize',
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
        root: {
            padding: theme.spacing(3, 2),
            position: 'relative',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400,
            marginBottom: '10px',
        },
        formTitle: {
            padding: theme.spacing(1, 2),
            textAlign: 'center',
            background: '#3f51b5',
            color: '#fff',
        },
        submitButtonWrapper: {
            display: 'flex',
            justifyContent: 'center',
        },
        inputGroups: {
            padding: theme.spacing(0, 1),
        },
        lastStep: {
            justifyContent: 'end',
            padding: theme.spacing(0, 1),
            display: 'flex',
            alignItems: 'center',
        },
    }));
    const ListUsers = useSelector((state) => state.user);
    const AllUsers = ListUsers?.list?.user?.filter((user) => user.userType == 'user');
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState();
    const [netValue, setnetValue] = useState();
    const [grandTotal, setGrandTotal] = useState();

    let history = useHistory();
    const dates = [];

    const [formData, setFormData] = useState({
        customerName: '',
        address: '',
        loan: '',
        paymentMode: '',
    });

    const { customerName, address, loan, paymentMode } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const classes = useStyles();

    useEffect(() => {
        dispatch(userList());
    }, [dispatch]);
    /////
    const [inputLists, setInputList] = useState([{ itemName: '', qty: '', salePrice: '', Total: '' }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputLists];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputLists];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputLists, { itemName: '', qty: '', salePrice: '', Total: '' }]);
    };

    //Total Amount
    const data = inputLists.map((item) => {
        item.Total = item.qty * item.salePrice;
        return item;
    });

    const total = inputLists.reduce((accumulator, current) => accumulator + current.Total, 0);
    const handleDiscount = (e) => {
        setDiscount(e.target.value);
        const net = total - e.target.value;
        setnetValue(net);
    };

    return (
        <div>
            <Grid item xs={8} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Details
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>

                    <Formik
                        initialValues={{
                            customerName: '',
                            address: '',
                            loan: '',
                            paymentMode: '',
                            date: '',
                            phone: '',
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {}}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form noValidate onSubmit={handleSubmit} id="json-form" className={classes.root}>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="customerName" class="form-label">
                                                Customer Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="customerName"
                                                aria-describedby="customerName"
                                                onChange={onChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="address" class="form-label">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="address"
                                                aria-describedby="address"
                                                onChange={onChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="date" class="form-label">
                                                Bill Date
                                            </label>
                                            <input
                                                type="date"
                                                class="form-control"
                                                name="date"
                                                aria-describedby="date"
                                                onChange={onChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="date" class="form-label">
                                                Mobile No.
                                            </label>
                                            <input
                                                type="phone"
                                                class="form-control"
                                                name="phone"
                                                aria-describedby="phone"
                                                onChange={onChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Paper>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Item Details
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>
                    <form noValidate id="json-form" className={classes.root}>
                        <Grid item xs={12} style={{ display: 'inline-block' }}>
                            <Grid item xs={12} style={{ display: 'flex' }} className={classes.inputGroups}>
                                <Grid item xs={6} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="itemName" class="form-label">
                                            Item Name
                                        </label>
                                    </div>
                                </Grid>
                                <Grid item xs={2} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="qty" class="form-label">
                                            Qty
                                        </label>
                                    </div>
                                </Grid>
                                <Grid item xs={2} className={classes.inputGroups}>
                                    <div class="mb-2">
                                        <label for="salePrice" class="form-label">
                                            Sale Price
                                        </label>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div class="mb-2">
                                        <label for="Total" class="form-label">
                                            Total
                                        </label>
                                    </div>
                                </Grid>
                                <div
                                    className="btn-box"
                                    style={{
                                        alignItems: 'center',
                                        visibility: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {inputLists.length !== 1 && (
                                        <IoMdRemove
                                            style={{
                                                backgroundColor: '#3f51b5',
                                                marginLeft: '10px',
                                            }}
                                            className="mr10 fs-4 fw-bolder text-white remove-field"
                                            onClick={() => handleRemoveClick()}
                                        />
                                    )}
                                </div>
                            </Grid>
                            {inputLists.map((x, i) => {
                                return (
                                    <Grid item xs={12} style={{ display: 'flex' }}>
                                        <div key={i} style={{ width: '100%', float: 'left' }} className={classes.inputGroups}>
                                            <Grid item xs={12} style={{ display: 'flex' }}>
                                                <Grid item xs={6} className={classes.inputGroups}>
                                                    <div class="mb-2">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="itemName"
                                                            aria-describedby="itemName"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2} className={classes.inputGroups}>
                                                    <div class="mb-2">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="qty"
                                                            aria-describedby="qty"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2} className={classes.inputGroups}>
                                                    <div class="mb-2">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="salePrice"
                                                            aria-describedby="salePrice"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div class="mb-2">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            value={data[i].Total}
                                                            name="Total"
                                                            aria-describedby="Total"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />
                                                    </div>
                                                </Grid>
                                                <div
                                                    className="btn-box"
                                                    style={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {inputLists.length !== 1 && (
                                                        <IoMdRemove
                                                            style={{
                                                                backgroundColor: '#3f51b5',
                                                                marginLeft: '10px',
                                                            }}
                                                            className="mr10 fs-4 fw-bolder text-white remove-field"
                                                            onClick={() => handleRemoveClick(i)}
                                                        />
                                                    )}
                                                </div>
                                            </Grid>
                                            <div style={{ width: '100%', textAlign: 'right' }} className="add-new">
                                                {inputLists.length - 1 === i && (
                                                    <IoMdAdd
                                                        onClick={handleAddClick}
                                                        className="fs-4 fw-bolder text-white"
                                                        style={{
                                                            backgroundColor: '#3f51b5',
                                                            marginLeft: '5em',
                                                            width: '32px',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Grid>
                                );
                            })}
                            <Grid item xs={12} style={{ display: 'flex' }} className={classes.inputGroups}>
                                <Grid item xs={10} className={classes.lastStep}>
                                    <label for="total" class="form-label">
                                        Total
                                    </label>
                                </Grid>
                                <Grid item xs={2}>
                                    <div class="mb-2 d-flex">
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={total > 0 ? total : ''}
                                            name="total"
                                            aria-describedby="total"
                                        />
                                    </div>
                                </Grid>
                                <div
                                    className="btn-box"
                                    style={{
                                        alignItems: 'center',
                                        visibility: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {inputLists.length !== 1 && (
                                        <IoMdRemove
                                            style={{
                                                backgroundColor: '#3f51b5',
                                                marginLeft: '10px',
                                            }}
                                            className="mr10 fs-4 fw-bolder text-white remove-field"
                                            onClick={() => handleRemoveClick()}
                                        />
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }} className={classes.inputGroups}>
                                <Grid item xs={10} className={classes.lastStep}>
                                    <label for="discount" class="form-label">
                                        Discount
                                    </label>
                                </Grid>
                                <Grid item xs={2}>
                                    <div class="mb-2 d-flex">
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="discount"
                                            aria-describedby="discount"
                                            onChange={handleDiscount}
                                        />
                                    </div>
                                </Grid>
                                <div
                                    className="btn-box"
                                    style={{
                                        alignItems: 'center',
                                        visibility: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {inputLists.length !== 1 && (
                                        <IoMdRemove
                                            style={{
                                                backgroundColor: '#3f51b5',
                                                marginLeft: '10px',
                                            }}
                                            className="mr10 fs-4 fw-bolder text-white remove-field"
                                            onClick={() => handleRemoveClick()}
                                        />
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }} className={classes.inputGroups}>
                                <Grid item xs={10} className={classes.lastStep}>
                                    <label for="netValue" class="form-label">
                                        Net After Discount
                                    </label>
                                </Grid>
                                <Grid item xs={2}>
                                    <div class="mb-2 d-flex">
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={netValue}
                                            name="netValue"
                                            aria-describedby="netValue"
                                        />
                                    </div>
                                </Grid>
                                <div
                                    className="btn-box"
                                    style={{
                                        alignItems: 'center',
                                        visibility: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {inputLists.length !== 1 && (
                                        <IoMdRemove
                                            style={{
                                                backgroundColor: '#3f51b5',
                                                marginLeft: '10px',
                                            }}
                                            className="mr10 fs-4 fw-bolder text-white remove-field"
                                            onClick={() => handleRemoveClick()}
                                        />
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.submitButtonWrapper}>
                            {inputLists[0].itemName == '' ? (
                                <Button variant="contained" color="primary" className={classes.button}>
                                    Save
                                </Button>
                            ) : (
                                <Bills bill={inputLists} discount={discount} net={netValue} formData={formData} />
                            )}
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};

export default Bill;
