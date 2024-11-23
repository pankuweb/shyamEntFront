import React, { useEffect, useReducer, useState } from 'react';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../actions/user';
import { Formik } from 'formik';
import dummy from './../../images/profile.webp';
import { APIURL } from '../../actions/config';
const AddUser = (props) => {
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
            marginTop: '20px',
            width: '200px',
            borderRadius: '0px',
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
    }));
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState();
    const [image, setImgae] = useState();

    let history = useHistory();

    const classes = useStyles();

    const handlephoto = (event) => {
        setProfileImage(event.target.files[0]);
    };

    useEffect(() => {
        var formdata = new FormData();
        formdata.append('photo', profileImage);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        };

        fetch(`${APIURL}/api/v1/users/uploadPhoto`, requestOptions)
            .then((response) => response.json())
            .then((result) => setImgae(result.Location))
            .catch((error) => console.log('error', error));
    }, [profileImage]);

    return (
        <div>
            <Grid item xs={10} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Add New Customer
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            relation: '',
                            relativeFirstName: '',
                            relativeLastName: '',
                            mobile: '',
                            adharNo: '',
                            gender: '',
                            dob: '',
                            state: '',
                            distt: '',
                            city: '',
                            pinCode: '',
                            correspondAddress: '',
                            permanentAddress: '',
                            nearAbout: '',
                            photo: '',
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            console.log(values);
                            values.photo = image ? image : dummy;
                            dispatch(addUser(values));
                            if (values !== '') {
                                setTimeout(() => {
                                    history.push('/customers/list');
                                }, 3000);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form noValidate onSubmit={handleSubmit} id="json-form" className={classes.root}>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="firstName" class="form-label">
                                                Applicant First Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.firstName}
                                                name="firstName"
                                                aria-describedby="firstName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="lastName" class="form-label">
                                                Applicant Last Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.lastName}
                                                name="lastName"
                                                aria-describedby="lastName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={4} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="relation" class="form-label">
                                                Relation
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.relation}
                                                name="relation"
                                                aria-describedby="relation"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="relativeFirstName" class="form-label">
                                                Relative First Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.relativeFirstName}
                                                name="relativeFirstName"
                                                aria-describedby="relativeFirstName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="relativeLastName" class="form-label">
                                                Relative Last Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.relativeLastName}
                                                name="relativeLastName"
                                                aria-describedby="relativeLastName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="email" class="form-label">
                                                Date Of Birth
                                            </label>
                                            <input
                                                type="date"
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.dob}
                                                name="dob"
                                                aria-describedby="dob"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="mobile" class="form-label">
                                                Mobile No
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.mobile}
                                                name="mobile"
                                                aria-describedby="mobile"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="adharNo" class="form-label">
                                                Adhar No
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.adharNo}
                                                name="adharNo"
                                                aria-describedby="adharNo"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="adharNo" class="form-label">
                                                Gender
                                            </label>
                                            <select
                                                class="form-select form-control"
                                                name="gender"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-label="Default select example"
                                            >
                                                <option selected>Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="correspondAddress" class="form-label">
                                                Correspondence Address
                                            </label>
                                            <textarea
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.correspondAddress}
                                                name="correspondAddress"
                                                rows="1"
                                                cols="50"
                                            ></textarea>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="permanentAddress" class="form-label">
                                                Permanant Address
                                            </label>
                                            <textarea
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.permanentAddress}
                                                name="permanentAddress"
                                                rows="1"
                                                cols="50"
                                            ></textarea>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="state" class="form-label">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.state}
                                                name="state"
                                                aria-describedby="state"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="distt" class="form-label">
                                                Distt.
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.distt}
                                                name="distt"
                                                aria-describedby="distt"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="city" class="form-label">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.city}
                                                name="city"
                                                aria-describedby="city"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="pinCode" class="form-label">
                                                Pincode
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.pinCode}
                                                name="pinCode"
                                                aria-describedby="pinCode"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={12} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="city" class="form-label">
                                                Near About
                                            </label>
                                            <textarea
                                                class="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.nearAbout}
                                                name="nearAbout"
                                                rows="2"
                                                cols="50"
                                            ></textarea>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={12} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="photo" class="form-label">
                                                Customer Photo
                                            </label>
                                            <input
                                                type="file"
                                                class="form-control"
                                                onChange={handlephoto}
                                                onBlur={handleBlur}
                                                defaultValue={profileImage}
                                                name="photo"
                                                aria-describedby="photo"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonWrapper}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                        Add Customer
                                    </Button>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </div>
    );
};

export default AddUser;
