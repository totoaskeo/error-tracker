import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Form, FormGroup, Input, Label, Row, Button } from 'reactstrap';
import { actionCreators } from '../store/Users';

class LoginOrSignup extends Component {
  constructor () {
    super();
    autoBind(this);
    this.state = {
      login: '',
      name: '',
      surname: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleLogin (event) {
    event.preventDefault();
    this.props.loginUser(this.state.login, this.state.password);
  }

  handleSignup (event) {
    if (this.state.confirmPassword !== this.state.password) {
      // TODO show validation message
      return;
    }
    this.props.registerUser(this.state);
    event.preventDefault()
  }

  handleChange (event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render () {
    return (
      <div>
        <h1 className="text-center">Вход в систему</h1>
        <Row className="justify-content-center">
          <Form id="loginForm" className="col-6" onSubmit={this.handleLogin}>
            <FormGroup className="clearfix">
              <Label className="float-left">Логин</Label>
              <span id="signupLink" className="float-right">Нет учётной записи? <a href="" onClick={this.showSignup}>Регистрация</a></span>
              <Input value={this.state.login} onChange={this.handleChange} name="login"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Пароль</Label>
              <Input type="password" value={this.state.password} onChange={this.handleChange} name="password"></Input>
            </FormGroup>
            <FormGroup>
              <Button>Войти</Button>
            </FormGroup>
          </Form>
        </Row>
        <Row className="justify-content-center">
          <Form id="signupForm" style={{display: 'none'}} className="col-6" onSubmit={this.handleSignup}>
            <FormGroup >
              <Label>Логин</Label>
              <span id="loginLink" className="float-right">Есть учётная запись? <a href="" onClick={this.showLogin}>Войти</a></span>
              <Input value={this.state.login} onChange={this.handleChange} name="login"></Input>
            </FormGroup>
            <FormGroup >
              <Label>Имя</Label>
              <Input value={this.state.name} onChange={this.handleChange} name="name"></Input>
            </FormGroup>
            <FormGroup >
              <Label>Фамилия</Label>
              <Input value={this.state.surname} onChange={this.handleChange} name="surname"></Input>
            </FormGroup>
            <FormGroup >
              <Label>Пароль</Label>
              <Input type="password" value={this.state.password} onChange={this.handleChange} name="password"></Input>
            </FormGroup>
            <FormGroup >
              <Label>Подтверждение пароля</Label>
              <Input type="password" value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPassword"></Input>
            </FormGroup>
            <FormGroup>
              <Button>Зарегистрироваться</Button>
            </FormGroup>
          </Form>
        </Row>
      </div>
    )
  }

  showSignup (event) {
    event.preventDefault()
    document.getElementById('loginForm').style.display = 'none'
    document.getElementById('signupForm').style.display = 'block'
  }

  showLogin (event) {
    event.preventDefault()
    document.getElementById('signupForm').style.display = 'none'
    document.getElementById('loginForm').style.display = 'block'
  }
}

export default connect(
  null,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(LoginOrSignup);
