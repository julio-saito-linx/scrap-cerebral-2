import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import users_list from '../../computed/users_list';
import UserItem from './UserItem/index';
import BigLoading from '../BigLoading/index';

require('./index.css');

export default connect(
  {
    users_list: users_list,
    is_loading: 'users.is_loading',
  },
  {},
  class Users extends Component {
    render() {
      return (
        <section id="users">
          <h1>Users</h1>
          {this.props.is_loading ? (
            <BigLoading/>
          ) : (
            this.props.users_list.map((key) => (
              <UserItem key={key} itemKey={key} user={this.props.users && this.props.users[ key ]}/>
            ))
          )}
        </section>
      );
    }
  }
)
