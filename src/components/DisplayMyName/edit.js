import React, { Component } from 'react';
import logo from '../../logo.svg';
import './edit.css';
import { connect } from 'cerebral/react';

export default connect(
  {
    my_name: 'display_my_name.my_name',
  },
  {
    my_name_changed: 'display_my_name.my_name_changed',
    button_clicked: 'display_my_name.button_clicked',
  },
  class Edit extends Component {
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
            My Name:
            <input
              className="textValue"
              type="text"
              value={this.props.my_name}
              onChange={(event) => this.props.my_name_changed({
                value: event.target.value
              })}/>
            <button
              className="clearButton"
              onClick={() => this.props.button_clicked()}
            >
              Clear
            </button>
          </div>
        </div>
      );
    }
  }
)
