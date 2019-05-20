import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import autoBind from 'react-autobind';
import './MessageAlert.css';

class AlertExample extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      message: ''
    };
  }

  async onDismiss() {
    this.setState({ message: '' });
  }

  render() {
    return (
      <Alert id="msgAlert" color="info" isOpen={!!this.state.message} toggle={this.onDismiss}>
        {this.state.message}
      </Alert>
    );
  }
}

export default connect(
  state => ({ messageError: state.errors.msg, messageUser: state.users.msg }),
  null
)(AlertExample);
