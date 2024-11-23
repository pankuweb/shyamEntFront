import React, { useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import ReportCard from './ReportCard';
import { gridSpacing } from './../../../store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { getTodaysLoan, loanList } from '../../../actions/loan';

const useStyles = makeStyles((theme) => ({
    arrowicon: {
        '& svg': {
            width: '20px',
            height: '20px',
            verticalAlign: 'top',
        },
    },
    flatcardbody: {
        padding: '0px !important',
        '& svg': {
            width: '40px',
            height: '40px',
        },
    },
    flatcardblock: {
        padding: '25px 25px',
        borderLeft: '1px solid' + theme.palette.background.default,
        [theme.breakpoints.down('xs')]: {
            borderLeft: 'none',
            borderBottom: '1px solid' + theme.palette.background.default,
        },
        [theme.breakpoints.down('sm')]: {
            borderBottom: '1px solid' + theme.palette.background.default,
        },
    },
    textsuccess: {
        color: theme.palette.success.main,
    },
    texterror: {
        color: theme.palette.error.main,
    },
}));

const Default = () => {
    const dispatch = useDispatch();

    const ListLoans = useSelector((state) => state.loan);
    const AllLoans = ListLoans?.list?.loan;
    const CompletedLoans = AllLoans?.filter((item) => item?.completed === 'true');
    const PendingLoans = AllLoans?.filter((item) => item?.completed === 'false');
    const TodaysLoan = ListLoans?.current_day_loans?.data?.result?.length;
    console.log(ListLoans);
    useEffect(() => {
        dispatch(loanList());
        dispatch(getTodaysLoan());
    }, [dispatch]);

    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary={`${AllLoans?.length ? AllLoans?.length : 0}`}
                            secondary="All Loan Holders"
                            color={theme.palette.warning.main}
                            footerData="No of all loan holders!"
                            iconPrimary={GroupOutlinedIcon}
                            iconFooter={ArrowUpwardOutlinedIcon}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary={`${CompletedLoans?.length ? CompletedLoans?.length : 0}`}
                            secondary="Completed Loans"
                            color={theme.palette.error.main}
                            footerData="No of all completed loans!"
                            iconPrimary={DoneOutlineOutlinedIcon}
                            iconFooter={ArrowUpwardOutlinedIcon}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary={`${PendingLoans?.length ? PendingLoans?.length : 0}`}
                            secondary="Pending Loans"
                            color={theme.palette.success.main}
                            footerData="No of all pending loans!"
                            iconPrimary={MoreHorizOutlinedIcon}
                            iconFooter={ArrowUpwardOutlinedIcon}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={12}>
                        <ReportCard
                            primary={`${TodaysLoan ? TodaysLoan : 0}`}
                            secondary="Today's Loans"
                            color={theme.palette.primary.main}
                            footerData="No of all today's loans!"
                            iconPrimary={TodayOutlinedIcon}
                            iconFooter={ArrowUpwardOutlinedIcon}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                <LatestorderCard title="Latest Order" />
            </Grid> */}
        </Grid>
    );
};

export default Default;
