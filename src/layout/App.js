import React, { useState, useEffect, lazy, Suspense, isValidElement, useCallback } from 'react';
import { useIdleTimer } from 'react-idle-timer';

import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { IntlProvider } from 'react-intl';

import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './../themes';
import Routes from '../Routes';
import NavigationScroll from './NavigationScroll';

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import AuthLogin from './../../src/views/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from '../views/ForgotPassword';

function loadLocaleData(locale) {
    switch (locale) {
        case 'fr':
            return import('./../compiled-lang/fr.json');
        case 'ro':
            return import('./../compiled-lang/ro.json');
        case 'zh':
            return import('./../compiled-lang/zh.json');
        default:
            return import('./../compiled-lang/en.json');
    }
}

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const App = () => {
    //
    const [timeout, setTimeout] = useState(360000);
    const [idle, setIdle] = useState(false);

    const onIdle = useCallback(() => {
        localStorage.clear();
        setIdle(true);
    }, []);

    const onAction = useCallback(() => {
        setIdle(false);
    }, []);

    const { getElapsedTime } = useIdleTimer({
        timeout: timeout,
        onIdle: onIdle,
        onAction: onAction,
    });
    getElapsedTime();
    //
    const customization = useSelector((state) => state.customization);
    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(customization.locale).then((d) => {
            setMessages(d.default);
        });
    }, [customization]);
    const token = localStorage.getItem('token');
    return (
        <React.Fragment>
            <Route path="/login" component={AuthLogin} />
            <Route path="/forgot/password" component={ForgotPassword} />

            {!token ? <Redirect exact to="/login" /> : ''}
            <ToastContainer autoClose={2000} />
            {messages && (
                <IntlProvider locale={customization.locale} defaultLocale="en" messages={messages}>
                    <CssBaseline />
                    <NavigationScroll>
                        <StylesProvider jss={jss}>
                            <ThemeProvider theme={theme(customization)}>
                                <Routes />
                            </ThemeProvider>
                        </StylesProvider>
                    </NavigationScroll>
                </IntlProvider>
            )}
        </React.Fragment>
    );
};

export default App;
