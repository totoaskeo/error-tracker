import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Errors';
import Tablesort from 'tablesort';
import ErrorListFilters from './ErrorListFilters'

class ErrorList extends Component {
  constructor () {
    super();
    this.state = {
      errors: []
    }
  }

  async componentDidMount () {
    new Tablesort(document.getElementById('errList'));
    await this.props.requestErrorList();
    await this.setState({ errors: this.props.errors });
  }

  async shouldComponentUpdate (nextProps, nextState) {
    if (nextState.errors.length !== this.state.errors.length) {
      await this.props.requestErrorList();
      await this.setState({ errors: this.props.errors });
    }
  }

  render () {
    return (
      <div>
        <Table className="mt-1" responsive id="errList">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Дата ввода</th>
              <th>Короткое описание</th>
              <th>Пользователь</th>
              <th>Статус</th>
              <th>Срочность</th>
              <th>Критичность</th>
            </tr>
          </thead>
          <tbody>
            {this.state.errors.map(e =>
              <tr key={e.id}>
                <td><Link to={`/error-card/${e.id}`}>{e.id}</Link></td>
                <td>{e.dateCreated}</td>
                <td>{e.shortDesc}</td>
                <td>{e.user}</td>
                <td>{e.status}</td>
                <td>{e.priority}</td>
                <td>{e.impact}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  state => ({ errors: state.errors.list }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ErrorList);
