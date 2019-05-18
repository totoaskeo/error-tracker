import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table} from 'reactstrap';
import format from 'date-fns/format';
import Tablesort from 'tablesort';
import { actionCreators } from '../store/Errors';

class ErrorHistory extends Component {
  componentDidMount () {
    new Tablesort(document.getElementById('errHist'));
  }

  render () {
    return (
      <div>
        <Table className="mt-2" responsive id="errHist">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Действие</th>
              <th>Пользователь</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {this.props.errorHistory.map(eh =>
              <tr key={eh.id}>
                <td>{format(eh.date, 'DD.MM.YYYY HH:mm')}</td>
                <td>{eh.action.name}</td>
                <td>{eh.user.login}</td>
                <td>{eh.comment}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  state => ({ error: state.errors.oneById }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ErrorHistory);
