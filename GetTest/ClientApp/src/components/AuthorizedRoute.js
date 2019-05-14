import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
 
const AuthorizedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    this.props.user.token
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login-or-signup', state: { from: props.location } }} />
  )} />
)

export default connect(
  state => state.users.user,
  null
)(AuthorizedRoute)
