import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Card, CardBody, CardTitle, FormGroup, Row, Col, Input, Button } from 'reactstrap';
import { actionCreators } from '../store/Errors';
import { actionCreatorsCl } from '../store/Classifiers';
import { format, parse } from 'date-fns';
import ErrorHistory from './ErrorHistory'

const mergedActionCreators = {...actionCreators, ...actionCreatorsCl};
const initialState = { mode: '',
  error: {
    shortDesc: '',
    description: '',
    priorityId: 1,
    statusId: 1,
    impactId: 1,
    user: {},
    status: {},
    userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '',
    errorHistory: [],
    dateCreated: '' // later
  }
};

class ErrorCard extends Component {
  constructor () {
    super();
    autoBind(this);
    this.state = initialState;
  }

  async componentDidUpdate (prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id && !this.props.match.params.id) {
      await this.setState(initialState);
    }
  }

  mode () {
    return this.props.match.params.id ? 'edit' : 'create';
  }

  async componentDidMount () {
    await this.props.requestErrorById(this.props.match.params.id);
    await this.setState({
      mode: this.mode(),
      error: { ...this.state.error, ...this.props.error }
    });
    await this.props.requestClassifiers();
  }

  async handleChange (event) {
    const { name, value } = event.target;
    const error = { ...this.state.error, [name]: value };
    await this.setState({ error });
  }

  async handleSaveClick (event) {
    event.preventDefault();
    if (this.state.mode === 'edit') { // update
      await this.props.updateError(this.state.error);
      await this.props.requestErrorById(this.props.error.id);
    } else { // create
      const dateCreated = parse(new Date());
      await this.setState({ error: { ...this.state.error, dateCreated } });
      await this.props.createError(this.state.error);
      this.props.history.push(`error-card/${this.props.error.id}`);
    }
    await this.setState({ mode: this.mode(), error: { ...this.state.error, ...this.props.error } });
  }

  async handleStatusChange (st, event) {
    event.preventDefault();
    let statusId = 1;
    switch (st) {
      case 'open':
        statusId = 2;
        break;
      case 'solve':
        statusId = 3;
        break;
      case 'close':
        statusId = 4;
        break;
      default:
        break;
    }
    await this.setState({ error: { ...this.state.error, statusId } });
    await this.props.updateError(this.state.error);
    await this.props.requestErrorById(this.props.error.id);
    await this.setState({ error: this.props.error });
  }

  render () {
    const errNum = this.state.error.id || '';
    return (
      <Row>
        <Col xs="5">
          <div style={{ display: this.state.mode === 'edit' ? 'flex' : 'none' }}>
            {(this.state.error.statusId == 1 || this.state.error.statusId == 3) &&
              <Button onClick={(event) => this.handleStatusChange('open', event)}
                className="mr-1" style={{ flex: '1 1'}}
              >Открыть</Button>
            }
            {this.state.error.statusId == 2 &&
              <Button onClick={(event) => this.handleStatusChange('solve', event)}
                className="mr-1" style={{ flex: '1 1'}}
              >Решена</Button>
            }
            {this.state.error.statusId == 3 &&
              <Button onClick={(event) => this.handleStatusChange('close', event)}
                style={{ flex: '1 1'}}
              >Закрыть</Button>
            }
          </div>
          {this.state.commentVisible &&
            <Input className="mt-1" type="textarea" rows="2"></Input>
          }
          <Card className="mt-3">
            <CardBody>
              <CardTitle>
                <p>Ошибка {errNum}</p>
                <Input value={this.state.error.shortDesc} onChange={this.handleChange} name="shortDesc"></Input>
              </CardTitle>
              <Input type="textarea" rows="5" value={this.state.error.description}
                onChange={this.handleChange} name="description">
              </Input>
              <Row className="mt-3">
                <Col xs="5">
                  <div>{this.state.error.dateCreated ? format(parse(this.state.error.dateCreated), 'DD.MM.YYYY HH:mm') : ''}</div>
                  <div>{this.state.error.user.login}</div>
                  <div className="mt-3">Статус: {this.state.error.status.name || 'Новая'}</div>
                </Col>
                <Col xs="7">
                  <FormGroup>
                    <Input type="select" onChange={this.handleChange}
                      value={this.state.error.priorityId} name="priorityId"
                    >
                      {this.props.classifiers.priorities.map(p =>
                        <option key={p.id} value={p.id}>{p.name}</option>
                      )}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input type="select" onChange={this.handleChange}
                      value={this.state.error.impactId} name="impactId"
                    >
                      {this.props.classifiers.impacts.map(p =>
                        <option key={p.id} value={p.id}>{p.name}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Button onClick={this.handleSaveClick} className="mt-2">Сохранить</Button>
        </Col>
        <Col xs="7">
          <h1 className="text-center">История ошибки</h1>
          <ErrorHistory errorHistory={this.state.error.errorHistory}></ErrorHistory>
        </Col>
      </Row>
    )
  }
}

export default connect(
  state => ({ error: state.errors.oneById, classifiers: state.classifiers }),
  dispatch => bindActionCreators(mergedActionCreators, dispatch)
)(ErrorCard);
