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

  toggle(event, ok) {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.props.onCommentSave(this.state.comment, ok);
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.modal !== this.state.modal) {
      this.setState({ modal: this.props.modal })
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader>Комментарий</ModalHeader>
          <ModalBody>
            <Input type="textarea" value={this.state.comment} onChange={this.handleChange}></Input>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={event => this.toggle(event, 'ok')}>Сохранить</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CommentModal;