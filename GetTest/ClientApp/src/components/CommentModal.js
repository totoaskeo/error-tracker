import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Комментарий</ModalHeader>
          <ModalBody>
            <Input type="textarea"></Input>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Сохранить</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CommentModal;