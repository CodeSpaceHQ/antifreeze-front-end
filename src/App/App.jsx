import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import HomePage from '../HomePage/home.jsx';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { GraphPage } from '../GraphPage/GraphPage.jsx';
import ButtonAppBar from '../Material/ButtonAppBar.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div>
                    <div>
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} /> 
                                {/* FIX ABOVE ME WITH component={HomePage} */}
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/graph" component={GraphPage} />
                                {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message} </div>
                                }
                            </div>
                        </Router> 
    
                    </div>
                </div>
    
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 