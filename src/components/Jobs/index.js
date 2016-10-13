import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import users_list from '../../computed/users_list'
import UserItem from './Items/index'

require('./index.css');
require('../shared_styles/loading_pulse.css');

export default connect(
  {
    users_list: users_list(),
    is_loading: 'users.is_loading',
  },
  {},
  class Jobs extends Component {
    render() {
      return (
        <section id="users">
          <h1>Jobs</h1>
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
