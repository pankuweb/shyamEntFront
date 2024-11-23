import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Loader from './component/Loader/Loader';
import NavMotion from './layout/NavMotion';
import MainLayout from './layout/MainLayout';
import MinimalLayout from './layout/MinimalLayout';
import AddUser from './views/Users/AddUser';
import UserList from './views/Users/UserList';
import EditUser from './views/Users/EditUser';
import AddLoan from './views/Loans/AddLoan';
import Bill from './views/Bill/Bill';
import AllBills from './views/Billing/AllBills';
import EditLoan from './views/Loans/EditLoan';
import LoanList from './views/Loans/LoanList';
import MonthlyLoanList from './views/Loans/MonthlyLoanList';
import AddInstallment from './views/Loans/AddInstallment';
import UserDetail from './views/Users/UserDetail';
import GradeAUser from './views/Users/GradeAUser';
import GradeBUser from './views/Users/GradeBUser';
import GradeCUser from './views/Users/GradeCUser';
import LoanDetails from './views/Loans/LoanDetails';
import LoanReports from './views/Loans/LoanReports';
import Sale from './views/Sale/Sale';
import TodaysLoans from './views/Loans/TodaysLoans';
import ClosedLoans from './views/Loans/ClosedLoans';
import CashBook from './views/CashBook/CashBook';
import CashBookList from './views/CashBook/CashBookList';
import Book from './views/Book/CashBook';
import CashBookEdit from './views/Book/CashBookEdit';
import BookList from './views/Book/CashBookList';
import LoanOverdueReport from './views/Loans/LoanOverdueReport';
import DownloadLoanReport from './views/Loans/DownloadLoanReport';
import EditInstallment from './views/Loans/EditInstallment';
import CollectionMonthly from './views/Loans/CollectionMonthly';
import DailyLoanOverdue from './views/Loans/DailyLoanOverdue';

const DashboardDefault = lazy(() => import('./views/Dashboard/Default'));

const Routes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <Route path={[]}>
                        <MinimalLayout>
                            <Switch location={location} key={location.pathname}>
                                <NavMotion></NavMotion>
                            </Switch>
                        </MinimalLayout>
                    </Route>
                    <Route
                        path={[
                            '/register',
                            '/application/register',
                            '/forgot-password',
                            '/application/forgot-password',
                            '/pages/error/error1',
                            '/pages/error/error2',
                            '/pages/comingsoon',

                            '/dashboard',
                            '/customers/add-customer',
                            '/customers/detail/:id',
                            '/bill',
                            '/customers/grade-a',
                            '/customers/grade-b',
                            '/customers/grade-c',
                            '/customers/edit-customer/:id',
                            '/customers/list',
                            '/loan/add-loan',
                            '/loan/edit-loan/:id',
                            '/loan/detail/:id',
                            '/loan/list',
                            '/loan/monthly',
                            '/loan/add-installment',
                            '/loan/edit-installment/:id/:ins',
                            '/loan/reports',
                            '/sale/reports',
                            '/loans/todays-installments',
                            '/loans/closed-loans',
                            '/cash-book',
                            '/book',
                            '/cash-book-edit/:id',
                            '/book-list',
                            '/cashbook-list',
                            '/loan/overdue',
                            '/loan/download-loan/:id',
                            '/loan/monthly-reports',
                            '/loan/daily-overdue',
                            '/bills',
                        ]}
                    >
                        <MainLayout>
                            <Switch location={location} key={location.pathname}>
                                <NavMotion>
                                    <Route path="/dashboard" component={DashboardDefault} />
                                    <Route path="/customers/add-customer" component={AddUser} />
                                    <Route path="/bill" component={Bill} />
                                    <Route path="/bills" component={AllBills} />
                                    <Route path="/customers/detail/:id" component={UserDetail} />
                                    <Route path="/customers/edit-customer/:id" component={EditUser} />
                                    <Route path="/customers/list" component={UserList} />
                                    <Route path="/customers/grade-a" component={GradeAUser} />
                                    <Route path="/customers/grade-b" component={GradeBUser} />
                                    <Route path="/customers/grade-c" component={GradeCUser} />
                                    <Route path="/loan/add-loan" component={AddLoan} />
                                    <Route path="/loan/edit-loan/:id" component={EditLoan} />
                                    <Route path="/loan/list" component={LoanList} />
                                    <Route path="/loan/monthly" component={MonthlyLoanList} />
                                    <Route path="/loan/detail/:id" component={LoanDetails} />
                                    <Route path="/loan/reports" component={LoanReports} />
                                    <Route path="/loan/monthly-reports" component={CollectionMonthly} />

                                    <Route path="/loan/add-installment/:id" component={AddInstallment} />
                                    <Route path="/loan/edit-installment/:id/:ins" component={EditInstallment} />
                                    <Route path="/sale/reports" component={Sale} />
                                    <Route path="/loans/todays-installments" component={TodaysLoans} />
                                    <Route path="/loans/closed-loans" component={ClosedLoans} />
                                    <Route path="/cash-book" component={CashBook} />
                                    <Route path="/cash-book-edit/:id" component={CashBookEdit} />
                                    <Route path="/cashbook-list" component={CashBookList} />
                                    <Route path="/book" component={Book} />
                                    <Route path="/book-list" component={BookList} />
                                    <Route path="/loan/overdue" component={LoanOverdueReport} />
                                    <Route path="/loan/daily-overdue" component={DailyLoanOverdue} />
                                    <Route path="/loan/download-loan/:id" component={DownloadLoanReport} />
                                </NavMotion>
                            </Switch>
                        </MainLayout>
                    </Route>
                </Switch>
            </Suspense>
        </AnimatePresence>
    );
};

export default Routes;
