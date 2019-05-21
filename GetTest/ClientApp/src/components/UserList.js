import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { actionCreators } from '../store/Users';

class UserList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: []
    }
  }

  async componentDidMount () {
    await this.props.requestUsers();
    await this.setState({ users: this.props.users });
  }

  render () {
    return (
      <div>
        <h1 className="text-center">Список пользователей</h1>
        <Table className="mt-3" responsive>
          <thead>
            <tr>
              <th>Учётная запись</th>
              <th>Имя</th>
              <th>Фамилия</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(u =>
              <tr key={u.id}>
                <td>{u.login}</td>
                <td>{u.name}</td>
                <td>{u.surname}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  state => ({ users: state.users.list }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(UserList);
