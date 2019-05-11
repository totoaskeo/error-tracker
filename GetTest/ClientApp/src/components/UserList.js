import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Form, FormGroup, Input, Label, Row, Button } from 'reactstrap';
import { actionCreators } from '../store/Users';

class LoginOrSignup extends Component {
  render () {
    return (
      <div>
      </div>
    )
  }
}

export default connect(
  state => null,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(LoginOrSignup);
