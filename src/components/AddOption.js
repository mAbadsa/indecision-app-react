import React from "react";

export default class AddOption extends React.Component {
  state = {
    error: undefined
  };
  handleAddOption = e => {
    e.preventDefault();
    const newOption = e.target.elements.optionInput.value.trim();
    const error = this.props.handleAddOption(newOption);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.optionInput.value = "";
      e.target.elements.optionInput.focus();
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="optionInput" />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}
