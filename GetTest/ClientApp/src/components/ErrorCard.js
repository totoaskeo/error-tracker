import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Card, CardBody, CardTitle, FormGroup, Row, Col, Input, Button, ButtonGroup } from 'reactstrap';
import { actionCreators } from '../store/Errors';
import { actionCreatorsCl } from '../store/Classifiers';
import ErrorHistory from './ErrorHistory'

const mergedActionCreators = {...actionCreators, ...actionCreatorsCl};

class ErrorCard extends Component {
  constructor () {
    super();
    autoBind(this);
    this.state = { isReadOnly: true, error: { } };
  }

  componentDidMount () {
    this.props.requestErrorById(this.props.match.params.id);
    this.setState({ isReadOnly: !!this.props.error.id, error: this.props.error });
    this.props.requestClassifiers();
  }

  handleChange (event) {
    const { name, value } = event.target;
    const error = { ...this.state.error, [name]: value };
    this.setState({ error });
  }

  handleSaveClick (event) {
    console.log(this.state.error)
    if (this.state.isReadOnly) { // update

    } else { // create
      this.props.createError(this.state.error);
    }
  }

  render () {
    const errNum = this.state.error.id || '';
    return (
      <Row>
        <Col xs="5">
          <div style={{ display: this.isReadOnly ? 'flex' : 'none' }}>
            <Button className="mr-1" style={{ flex: '1 1'}}>Left</Button>
            <Button className="mr-1" style={{ flex: '1 1'}}>Middle</Button>
            <Button style={{ flex: '1 1'}}>Right</Button>
          </div>
          <Card className="mt-3">
            <CardBody>
              <CardTitle>
                <p>Новая ошибка {errNum}</p>
                <Input value={this.state.error.shortDesc} onChange={this.handleChange} {... { disabled: this.state.isReadOnly } } name="shortDesc"></Input>
              </CardTitle>
              <Input type="textarea" rows="10" value={this.state.error.description} onChange={this.handleChange}
                {... { disabled: this.state.isReadOnly } } name="description"
              ></Input>
              <Row className="mt-3">
                <Col xs="5">
                  <div>{this.state.error.dateCreated}</div>
                  <div>{this.state.error.user}</div>
                  <div className="mt-3">Статус: {this.state.error.status}</div>
                </Col>
                <Col xs="7">
                  <FormGroup>
                    <Input type="select" {... { disabled: this.state.isReadOnly } } onChange={this.handleChange}
                      value={this.state.error.priorityId} name="priorityId"
                    >
                      {this.props.classifiers.priorities.map(p =>
                        <option key={p.id} value={p.id}>{p.name}</option>
                      )}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input type="select" {... { disabled: this.state.isReadOnly } } onChange={this.handleChange}
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
          <ErrorHistory errorId={this.props.match.params.id}></ErrorHistory>
        </Col>
      </Row>
    )
  }
}

export default connect(
  state => ({ error: state.errors.oneById, classifiers: state.classifiers }),
  dispatch => bindActionCreators(mergedActionCreators, dispatch)
)(ErrorCard);
