import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import './index.css';
import users_list from '../../computed/users_list'
import UserItem from './UserItem/index'

export default connect(
  {
    users_list: users_list(),
    is_loading: 'users.is_loading',
  },
  {},
  class Users extends Component {
    render() {
      return (
        <section id="users">
          <h1>Users</h1>
          {this.props.is_loading ? (
            <div className="loading-pulse"></div>
          ) : (
            this.props.users_list.map((key) => (
              <UserItem key={key} itemKey={key}/>
            ))
          )}
        </section>
      );
    }
  }
)
