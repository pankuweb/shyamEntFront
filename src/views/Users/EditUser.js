import React, { useReducer, useEffect, useState } from 'react';
import { Grid, Button, Icon, TextField, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { editUser } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { APIURL } from '../../actions/config';
import { Formik } from 'formik';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import './style.css';
import defaultImg from './../../images/logo.png';
const initialState = { alt: '', src: '' };

const token = localStorage.getItem('token');
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};

const EditUser = (props) => {
    const [{ alt, src }, setPreview] = useState(initialState);

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
    const [UserDetail, setUserDetail] = useState();
    const [profileImage, setProfileImage] = useState();
    const [image, setImgae] = useState();
    const User = UserDetail?.user;
    const dispatch = useDispatch();
    const { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        // Get Users
        var requestOptions = {
            method: 'GET',
            headers: header,
            redirect: 'follow',
        };

        fetch(`${APIURL}/api/v1/users/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUserDetail(result.data);
            });

        // Upload photo
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
    }, [dispatch, profileImage]);

    const classes = useStyles();

    const fileHandler = (event) => {
        const { files } = event.target;
        setPreview(
            files.length
                ? {
                      src: URL.createObjectURL(files[0]),
                      alt: files[0].name,
                  }
                : initialState
        );
        setProfileImage(event.target.files[0]);
    };
    return (
        <div>
            <Grid item xs={10} style={{ margin: '0 auto' }}>
                <Paper>
                    <Typography variant="h5" component="h3" className={classes.formTitle}>
                        Edit User
                    </Typography>
                    <Typography component="p">{props.formDescription}</Typography>

                    <Formik
                        initialValues={{
                            firstName: User?.firstName,
                            lastName: User?.lastName,
                            relation: User?.relation,
                            relativeFirstName: User?.relativeFirstName,
                            relativeLastName: User?.relativeLastName,
                            mobile: User?.mobile,
                            adharNo: User?.adharNo,
                            gender: User?.gender,
                            dob: User?.dob,
                            state: User?.state,
                            distt: User?.distt,
                            city: User?.city,
                            pinCode: User?.pinCode,
                            correspondAddress: User?.correspondAddress,
                            permanentAddress: User?.permanentAddress,
                            nearAbout: User?.nearAbout,
                            photo: User?.photo,
                        }}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            values.photo = image ? image : User?.photo;
                            dispatch(editUser(values, id));
                            if (values !== '') {
                                setTimeout(() => {
                                    history.push('/customers/list');
                                }, 3000);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form noValidate onSubmit={handleSubmit} id="json-form" className={classes.root}>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <div class="image-upload" style={{ height: '100px', width: '100px' }}>
                                        <label for="file-input" style={{ height: '100%', width: '100%' }} className="profilepic">
                                            {User?.photo ? (
                                                <img
                                                    className="preview rounded-circle profilepic__image"
                                                    src={src ? src : User?.photo}
                                                    alt={alt}
                                                />
                                            ) : (
                                                <img
                                                    className="preview rounded-circle profilepic__image"
                                                    src={src ? src : defaultImg}
                                                    alt={alt}
                                                />
                                            )}

                                            <div class="profilepic__content">
                                                <span class="profilepic__icon">
                                                    <CameraAltOutlinedIcon style={{ color: '#000' }} />
                                                </span>
                                            </div>
                                        </label>

                                        <input id="file-input" accept="image/*" type="file" onChange={fileHandler} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="firstName" class="form-label">
                                                Applicant First Name
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                defaultValue={values.firstName ? values.firstName : User?.firstName}
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
                                                defaultValue={values.lastName ? values.lastName : User?.lastName}
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
                                                defaultValue={values.relation ? values.relation : User?.relation}
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
                                                defaultValue={values.relativeFirstName ? values.relativeFirstName : User?.relativeFirstName}
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
                                                defaultValue={values.relativeLastName ? values.relativeLastName : User?.relativeLastName}
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
                                                defaultValue={values.dob ? values.dob : User?.dob}
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
                                                defaultValue={values.mobile ? values.mobile : User?.mobile}
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
                                                defaultValue={values.adharNo ? values.adharNo : User?.adharNo}
                                                name="adharNo"
                                                aria-describedby="adharNo"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className={classes.inputGroups}>
                                        <div class="mb-2">
                                            <label for="gender" class="form-label">
                                                Sex
                                            </label>
                                            <select
                                                class="form-select form-control"
                                                name="gender"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-label="Default select example"
                                            >
                                                <option selected>Select Gender</option>
                                                <option value="male" selected={User?.gender == 'male' ? true : false}>
                                                    Male
                                                </option>
                                                <option value="female" selected={User?.gender == 'female' ? true : false}>
                                                    Female
                                                </option>
                                                <option value="other" selected={User?.gender == 'other' ? true : false}>
                                                    Other
                                                </option>
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
                                                defaultValue={values.correspondAddress ? values.correspondAddress : User?.correspondAddress}
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
                                                defaultValue={values.permanentAddress ? values.permanentAddress : User?.permanentAddress}
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
                                                defaultValue={values.state ? values.state : User?.state}
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
                                                defaultValue={values.distt ? values.distt : User?.distt}
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
                                                defaultValue={values.city ? values.city : User?.city}
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
                                                defaultValue={values.pinCode ? values.pinCode : User?.pinCode}
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
                                                defaultValue={values.nearAbout ? values.nearAbout : User?.nearAbout}
                                                name="nearAbout"
                                                rows="2"
                                                cols="50"
                                            ></textarea>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonWrapper}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                        Edit User
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

export default EditUser;
