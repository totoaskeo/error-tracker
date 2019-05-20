import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      modal: this.props.modal,
      comment: ''
    };
  }

  async handleChange (event) {
    await this.setState({ comment: event.target.value});
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.props.onCommentSave(this.state.comment);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Комментарий</ModalHeader>
          <ModalBody>
            <Input type="textarea" value={this.state.comment} onChange={this.handleChange}></Input>
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