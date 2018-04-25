import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import HomePage from '../HomePage/home.jsx';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import GraphPage from '../GraphPage/GraphPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
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
                <PrivateRoute exact path='/' component={HomePage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={RegisterPage} />
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Route path='/graph/:device_key' component={GraphPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

export default connect(mapStateToProps)(App);
