import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Form, FormGroup, Input, Label, Row, Button } from 'reactstrap';
import { actionCreators } from '../store/WeatherForecasts';
import './LoginOrSignup.css'

class LoginOrSignup extends Component {
  constructor () {
    super();
    autoBind(this);
  }

  handleLogin (event) {
    event.preventDefault()
  }

  handleSignup (event) {
    event.preventDefault()
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
              <Input></Input>
            </FormGroup>
            <FormGroup>
              <Label>Пароль</Label>
              <Input type="password"></Input>
            </FormGroup>
            <FormGroup>
              <Button>Войти</Button>
            </FormGroup>
          </Form>
        </Row>
        <Row className="justify-content-center">
          <Form id="signupForm" className="col-6" onSubmit={this.handleSignup}>
            <FormGroup >
              <Label>Логин</Label>
              <span id="loginLink" className="float-right">Есть учётная запись? <a href="" onClick={this.showLogin}>Войти</a></span>
              <Input></Input>
            </FormGroup>
            <FormGroup >
              <Label>Имя</Label>
              <Input></Input>
            </FormGroup>
            <FormGroup >
              <Label>Фамилия</Label>
              <Input></Input>
            </FormGroup>
            <FormGroup >
              <Label>Пароль</Label>
              <Input type="password"></Input>
            </FormGroup>
            <FormGroup >
              <Label>Подтверждение пароля</Label>
              <Input type="password"></Input>
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
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(LoginOrSignup);
