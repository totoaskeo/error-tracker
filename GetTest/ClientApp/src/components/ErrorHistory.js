import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table} from 'reactstrap';
import Tablesort from 'tablesort';
import { actionCreators } from '../store/Errors';

class ErrorHistory extends Component {
  componentDidMount () {
    new Tablesort(document.getElementById('errHist'));
    this.props.requestErrorById(this.props.errorId);
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
            {this.props.error.errorHistory.map(eh =>
              <tr key={eh.id}>
                <td>{eh.date}</td>
                <td>{eh.action}</td>
                <td>{eh.user}</td>
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
