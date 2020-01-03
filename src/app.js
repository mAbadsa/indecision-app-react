import React, { Component } from "react";
import ReactDOM from "react-dom";
import IndecisionApp from "./components/IndecisionApp";
import 'normalize.css/normalize.css';
import './styles/style.scss';

class App extends Component {
  render() {
    return (
      <div>
        <IndecisionApp />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
