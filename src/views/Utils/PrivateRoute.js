import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => {
    const isAuthed = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            exact
            render={(props) =>
                isAuthed ? (
                    <div>{React.createElement(component, props)}</div>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
