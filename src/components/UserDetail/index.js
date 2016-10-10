import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import './index.css';

export default connect({
    user_id: `users.user_id`,
    users: `users.list.*`,
    is_loading: 'users.is_loading',
  },
  {},
  class UserDetail extends Component {
    render() {
      const user = this.props.users[ this.props.user_id ];

      return (
        <section id="user_detail">
          <h1>User Details</h1>
          {this.props.is_loading ? (
            <div className="loading-pulse"></div>
          ) : (
            <div className="details">
              <label htmlFor="id">
                <img src={user.photoURL} alt="user"/>
              </label>
              <label htmlFor="name">
                {user.displayName}
              </label>
              <label htmlFor="id">
                <code>
                  {user.user_id}
                </code>
              </label>
            </div>
          )}
        </section>
      );
    }
  }
)
