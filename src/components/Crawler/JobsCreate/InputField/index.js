import React, { Component } from 'react';
require('./index.css');

export default class InputField extends Component {
  render() {
    return (
      <div className="field">
        <label className="field_label">{this.props.title}:</label>
        <input
          className="field_value"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}
