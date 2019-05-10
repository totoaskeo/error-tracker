import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Errors';
import './ErrorList.css'

class ErrorHistory extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <div></div>
    )
  }
}

export default connect(
  state => ({ error: state.errors.oneById }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ErrorHistory);
