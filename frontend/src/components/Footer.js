import React, { Component } from "react";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const { toggle, onSave } = this.props;
    return (
      <footer>
        <h1>
            This is a footer.
        </h1>
      </footer>
    );
  }
}