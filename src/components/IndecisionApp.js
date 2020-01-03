import React from "react";
import AddOption from "./AddOption";
import Header from "./Header";
import Options from "./Options";
import Action from "./Action";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
  state = {
    title: "Indecision App",
    subTitle: "Put your life in the hands of a computer",
    options: ["Option__One", "Option__Two"],
    selectedOption: undefined
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = option => {
    console.log("Remove", option);
    this.setState(prevState => ({
      options: prevState.options.filter(opt => opt !== option)
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }));
  };

  handleAddOption = newOption => {
    if (!newOption) {
      return "Enter valid value to add item!";
    } else if (this.state.options.indexOf(newOption) > -1) {
      return "This option already exists!";
    }
    this.setState(prevState => ({
      options: prevState.options.concat(newOption)
    }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  componentDidMount = (prevProps, prevState) => {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {}
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  };

  render() {
    return (
      <div>
        <Header title={this.state.title} subTitle={this.state.subTitle} />
       <div className="container">
        <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption
            options={this.state.options}
            handleAddOption={this.handleAddOption}
          />
       </div>
        <OptionModal
          handleClearSelectedOption={this.handleClearSelectedOption}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}

export default IndecisionApp;
