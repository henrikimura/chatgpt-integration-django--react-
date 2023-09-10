import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{ this.props.cityDetail.domain + ' in ' + this.props.cityDetail.city }</ModalHeader>
        <ModalBody>
          <p>{ this.props.cityDetail.description }</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => this.props.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}