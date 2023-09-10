import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const { toggle, onSave } = this.props;

    return (
      <header>
        <h1>
            This is a header.
        </h1>
      </header>
    );
  }
}