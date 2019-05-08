import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { actionCreators } from '../store/WeatherForecasts';
import ErrorListFilters from './ErrorListFilters'

class ErrorList extends Component {
  render () {
    return (
      <div>
        <ErrorListFilters></ErrorListFilters>
        <Table hover responsive>
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
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ErrorList);
