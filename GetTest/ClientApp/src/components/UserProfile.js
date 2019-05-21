import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';

import { actionCreators } from '../store/Users';

class UserProfile extends Component {
  constructor (props) {
    super(props);
    autoBind(this);
    this.state = {
      user: {
        login: '',
        name: '',
        surname: ''
      }
    }
  }
  
  async componentDidMount () {
    await this.props.requestUsers();
    await this.setState({ user: this.props.user });
  }
  
  handleChange (event) {
    const user = { ...this.state.user, [event.target.name]: event.target.value };
    this.setState({ user });
  }

  async editUser (event) {
    event.preventDefault();
    console.log(this.state.user);
    await this.props.updateUser(this.state.user);
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
                <Input onChange={this.handleChange} name="login" value={this.state.user.login} disabled></Input>
              </FormGroup>
              <FormGroup>
                <Label>Имя</Label>
                <Input onChange={this.handleChange} name="name" value={this.state.user.name}></Input>
              </FormGroup>
              <FormGroup>
                <Label>Фамилия</Label>
                <Input onChange={this.handleChange} name="surname" value={this.state.user.surname}></Input>
              </FormGroup>
              <Button onClick={this.editUser}>Сохранить</Button>
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
