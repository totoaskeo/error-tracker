import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Form, Input, Label, Col, Button } from 'reactstrap';
import { actionCreatorsCl } from '../store/Classifiers';

class ErrorListFilters extends Component {
  componentDidMount() {
    this.ensureDataFetched();
  }

  componentDidUpdate() {
  }

  ensureDataFetched() {
    this.props.requestClassifiers();
  }

  render () {
    return (
      <Form>
        <Row>
          <Col>
            <Label>Статус</Label>
            <Input type="select">
              {this.props.statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Input>
          </Col>
          <Col>
            <Label>Срочность</Label>
            <Input type="select">
              {this.props.priorities.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Input>
          </Col>
          <Col>
            <Label>Критичность</Label>
            <Input type="select">
              {this.props.impacts.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>С</Label>
            <Input type="date"></Input>
          </Col>
          <Col>
            <Label>По</Label>
            <Input type="date"></Input>
          </Col>
          <Col>
            <Button style={{ marginTop: '32px'}}>Обновить</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default connect(
  state => ({
    statuses: state.classifiers.statuses,
    priorities: state.classifiers.priorities,
    impacts: state.classifiers.impacts
  }),
  dispatch => bindActionCreators(actionCreatorsCl, dispatch)
)(ErrorListFilters);