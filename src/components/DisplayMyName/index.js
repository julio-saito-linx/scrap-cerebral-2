import React, { Component } from 'react';
import './index.css';
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
        <section id="display_my_name">
          <h1>Display My Name</h1>
          <div className="inputs">
            name:
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
          {this.props.my_name && (
            <p className="name">
              {this.props.my_name}
            </p>
          )}
        </section>
      );
    }
  }
)
