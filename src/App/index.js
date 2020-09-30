import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader';
import Aux from '../hoc/_Aux';
import ScrollToTop from './layout/ScrollToTop';
import routes from '../route';
import Parse from 'parse';
import { checkUser } from './utils';

Parse.initialize(
  process.env.REACT_APP_APPLICATION_ID,
  process.env.REACT_APP_JAVASCRIPT_KEY,
  process.env.REACT_APP_MASTER_KEY
);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;
Parse.masterKey = process.env.REACT_APP_MASTER_KEY;

const AdminLayout = Loadable({
  loader: () => import('./layout/AdminLayout'),
  loading: Loader
});

class App extends Component {
  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) =>
            !checkUser() ? <route.component {...props} /> : <Route path='/' component={AdminLayout} />}
        />
      ) : null;
    });

    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {menu}
              {/* Check user sudah login atau belum */}
              {checkUser() ? (
                // kalau sudah redirect ke halaman Admin
                <Route path='/' component={AdminLayout} />
              ) : (
                // kalau belum redirect ke halaman sign in
                <Redirect to='/auth/signin-1' />
              )}

              {/* <Route path='/' component={AdminLayout} />
              <Route
                path='/dashboard'
                render={(props) =>
                  checkUser() ? <Redirect to='/dashboard/default' /> : <Redirect to='/auth/signin-1' />}
              /> */}
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

export default App;
