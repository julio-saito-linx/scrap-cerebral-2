import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import './index.css';
import BigLoading from '../BigLoading/index';

export default connect({
    selected_user: 'users.selected_user',
    is_loading: 'users.is_loading',
  },
  {},
  class UserDetail extends Component {
    render() {
      if (!this.props.selected_user) {
        return null;
      }
      return (
        <section id="user-detail-section">
          <h1>User Details</h1>
          {this.props.is_loading ? (
            <BigLoading/>
          ) : (
            <div className="user-details">
              <label htmlFor="id">
                <img src={this.props.selected_user.photoURL} alt="user"/>
              </label>
              <label htmlFor="name">
                {this.props.selected_user.displayName}
              </label>
              <label htmlFor="id">
                <code>
                  {this.props.selected_user.uid}
                </code>
              </label>
            </div>
          )}
        </section>
      );
    }
  }
)
