import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, FormGroup, Row, Col, Input } from 'reactstrap';
import { actionCreators } from '../store/Errors';
import ErrorHistory from './ErrorHistory'

class ErrorCard extends Component {
  componentDidMount () {
    this.props.requestErrorById(this.props.match.params.id)
    // this.props.requestClassifiers()
  }

  render () {
    return (
      <Row>
        <Col xs="5">
          <Card>
            <CardBody>
              <CardTitle>
                <Input value={'Ошибка ' + this.props.error.id + ' — ' + this.props.error.shortDesc}></Input>
              </CardTitle>
              <Input type="textarea" rows="10" value={this.props.error.description}></Input>
              <Row className="mt-3">
                <Col xs="5">
                  <div>{this.props.error.dateCreated}</div>
                  <div>{this.props.error.user}</div>
                  <div className="mt-3">Статус: {this.props.error.status}</div>
                </Col>
                <Col xs="7">
                  <FormGroup>
                    <Input type="select">
                      {this.props.classifiers.priorities.map(p =>
                        <option key={p.id} value={p.id}>{p.name}</option>
                      )}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input type="select">
                      {this.props.classifiers.priorities.map(p =>
                        <option key={p.id} value={p.id}>{p.name}</option>
                      )}
                    </Input> 
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ErrorCard);
