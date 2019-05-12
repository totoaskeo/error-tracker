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
    this.state = { pwdResetText: 'Cменить пароль' }
  }

  componentDidMount () {
    this.props.requestUsers();
  }

  showPasswordReset (event) {
    event.preventDefault();
    document.querySelectorAll('.pwdReset').forEach(el => {
      el.style.display = 'block';
    })
    if (this.state.pwdResetText === 'Сменить пароль') {
      this.setState(state => {
        state.pwdResetText = 'Отменить смену пароля'
      })
    } else {
      this.pwdResetText = 'Сменить пароль';
    }
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
                <span className="float-right"><a href="" onClick={this.showPasswordReset}>{this.state.pwdResetText}</a></span>
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
              <FormGroup className="pwdReset" style={{ display: 'none' }}>
                <Label>Новый пароль</Label>
                <Input type="password"></Input>
              </FormGroup>
              <FormGroup className="pwdReset" style={{ display: 'none' }}>
                <Label>Подтверждение пароля</Label>
                <Input type="password"></Input>
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
