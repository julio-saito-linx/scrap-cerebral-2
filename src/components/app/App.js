import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { connect } from 'cerebral/react';

export default connect(
  {
    text: 'text',
  },
  {
    textChanged: 'textChanged',
    buttonClicked: 'buttonClicked',
  },
  class App extends Component {
    render() {
      return (
        <div className="App">
          <div className="App-header">
            <h2>Cerebral 2</h2>
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <p className="App-intro">
            Edit <code>./src/components/app/App.js</code> and save to reload.
          </p>
          <div className="App-inputs">
            <input
              className="textValue"
              type="text"
              value={this.props.text}
              onChange={(event) => this.props.textChanged({
                text: event.target.value
              })}/>
            <button
              className="clearButton"
              onClick={() => this.props.buttonClicked()}
            >
              Clear
            </button>
          </div>
        </div>
      );
    }
  }
)
