import React, { Fragment } from 'react';
import './css/reset.css';
import './css/normalize.css';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignUp from './components/signup/SignUp';
import * as apiCalls from './api/apiCalls'

const actions = {
  postSignup: apiCalls.signup
}
const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Container max-width='sm'>
          <Switch>
            <Route
              path='/cadastrar'
              render={prop => <SignUp actions={actions} />}
            />
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
};

export default App;
