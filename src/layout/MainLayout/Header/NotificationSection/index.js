import React, { useEffect, useState } from 'react';

import {
    makeStyles,
    Button,
    Chip,
    ClickAwayListener,
    Fade,
    Grid,
    Paper,
    Popper,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    ListItemSecondaryAction,
    Typography,
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector, useDispatch } from 'react-redux';

import QueryBuilderTwoToneIcon from '@material-ui/icons/QueryBuilderTwoTone';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';

import customer1 from './../../../../assets/images/users/avatar-1.jpg';
import User2 from './../../../../assets/images/users/avatar-2.jpg';
import User3 from './../../../../assets/images/users/avatar-3.jpg';
import User4 from './../../../../assets/images/users/avatar-4.jpg';
import { getEditLoan, loanNotifications } from '../../../../actions/loan';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grow: {
        flex: 1,
    },
    root: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '250px',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: 0,
        borderRadius: '10px',
    },
    inline: {
        display: 'inline',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    subHeader: {
        backgroundColor: theme.palette.grey.A400,
        color: theme.palette.common.white,
        padding: '5px 15px',
    },
    subFooter: {
        backgroundColor: theme.palette.grey.A400,
        color: theme.palette.common.white,
        padding: 0,
    },
    iconButton: {
        padding: '5px',
    },
    showIcon: {
        transform: 'rotate(90deg)',
    },
    listSection: {
        backgroundColor: 'inherit',
        display: 'block',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    listAction: {
        top: '16px',
    },
    actionIcon: {
        fontSize: '0.75rem',
        marginRight: '4px',
        color: theme.palette.grey[400],
    },
    actionColor: {
        color: theme.palette.grey[400],
    },
    ScrollHeight: {
        height: '320px',
        overflowX: 'hidden',
    },
    p0: {
        padding: 0,
    },
    pT0: {
        paddingTop: 0,
    },
    menuIIcon: {
        fontSize: '1.5rem',
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            minWidth: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '35px',
        },
    },
    cross: {
        width: ' 0.8em',
        height: ' 0.8em',
        cursor: 'pointer',
    },
}));

const NotificationSection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const ListNotifications = useSelector((state) => state.loan);
    const AllNotifications = ListNotifications?.notifications?.result;

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const removeNotification = (id) => {
        dispatch(getEditLoan(id));
        setTimeout(() => {
            history.push('/dashboard');
        }, 3000);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
        dispatch(loanNotifications());
    }, [dispatch, open]);
    return (
        <React.Fragment>
            <Button
                className={classes.menuButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <NotificationsNoneTwoToneIcon className={classes.menuIIcon} />
            </Button>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: {
                        offset: {
                            enable: true,
                            offset: '0px, 10px',
                        },
                        preventOverflow: {
                            padding: 0,
                        },
                    },
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List className={classes.root}>
                                    <PerfectScrollbar className={classes.ScrollHeight}>
                                        {AllNotifications?.length ? (
                                            AllNotifications?.map((item) => {
                                                return (
                                                    <ListItem button alignItems="flex-start" className={classes.pT0}>
                                                        {/* <ListItemAvatar>
                                                              <Avatar alt="John Doe" src={User1} />
                                                          </ListItemAvatar> */}
                                                        <ListItemText
                                                            //   primary={<Typography variant="subtitle1">John Doe</Typography>}
                                                            secondary={
                                                                <Typography variant="subtitle2">{`${item?.customer?.firstName} ${item?.customer?.lastName} has pending installments`}</Typography>
                                                            }
                                                        />
                                                        <ListItemSecondaryAction className={classes.listAction}>
                                                            <Grid container justify="flex-end">
                                                                <Grid item>
                                                                    <ClearOutlinedIcon
                                                                        className={classes.cross}
                                                                        onClick={() => {
                                                                            removeNotification(item._id);
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                );
                                            })
                                        ) : (
                                            <ListItem button alignItems="flex-start" className={classes.pT0}>
                                                <ListItemText secondary={<Typography variant="subtitle2">No Data Found</Typography>} />
                                            </ListItem>
                                        )}
                                    </PerfectScrollbar>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default NotificationSection;
