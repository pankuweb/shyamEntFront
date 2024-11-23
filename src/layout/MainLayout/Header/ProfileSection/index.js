import React from 'react';

import { makeStyles, Fade, Button, ClickAwayListener, Paper, Popper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import PersonTwoToneIcon from '@material-ui/icons/PersonTwoTone';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import LockOpenTwoTone from '@material-ui/icons/LockOpenTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Link from '@material-ui/core/Link';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '250px',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: 0,
        borderRadius: '10px',
    },
    subHeader: {
        backgroundColor: theme.palette.grey.A400,
        color: theme.palette.common.white,
        padding: '5px 15px',
    },
    menuIcon: {
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
}));

const ProfileSection = () => {
    const classes = useStyles();
    let history = useHistory();

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index === 4) {
            //handleLogout;
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
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
    }, [open]);

    const logout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully!');

        setTimeout(() => {
            history.push('/login');
        }, 3000);
    };

    const bill = () => {
        history.push('/bill');
    };
    return (
        <React.Fragment>
            <Button
                onClick={() => {
                    bill();
                }}
                className={classes.menuButton}
                ref={anchorRef}
                color="inherit"
            >
                <ReceiptOutlinedIcon className={classes.menuIcon} />
            </Button>
            <Button
                className={classes.menuButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => {
                    history.push('/forgot/password');
                }}
                color="inherit"
            >
                <AccountBoxOutlinedIcon className={classes.menuIcon} />
            </Button>
            <Button
                className={classes.menuButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => {
                    logout();
                }}
                color="inherit"
            >
                <ExitToAppOutlinedIcon className={classes.menuIcon} />
            </Button>
        </React.Fragment>
    );
};

export default ProfileSection;
