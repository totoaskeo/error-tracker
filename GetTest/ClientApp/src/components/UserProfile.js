import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import { actionCreators } from '../store/Users';

class UserProfile extends Component {
  constructor () {
    super();
    autoBind(this);
    this.state = {
      login: '',
      name: '',
      surname: '',
    }
  }

  componentDidMount () {
    this.props.requestUsers();
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={{ size: 'auto', offset: 3 }}>
            <h1 className="text-center">Профиль пользователя</h1>
            <Form>
              <FormGroup>
                <Label>Логин</Label>
                <Input></Input>
              </FormGroup>
              <FormGroup>
                <Label>Имя</Label>
                <Input></Input>
              </FormGroup>
              <FormGroup>
                <Label>Фамилия</Label>
                <Input></Input>
              </FormGroup>
              <Button>Сохранить</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.users.user }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(UserProfile);
