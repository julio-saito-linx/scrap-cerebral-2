import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import cerebral_logo from './assets/cerebral_logo_bg.svg';
import react_logo from './assets/logo.svg';
import './main.css';
import Home from '../Home';
import DisplayMyName from '../DisplayMyName';
import Users from '../Users';
import UserDetail from '../UserDetail';
import Jobs from '../Crawler/Jobs';
import JobsAddEdit from '../Crawler/JobsAddEdit';
import QueueErrors from '../QueueErrors/index';

const pages = {
  home: Home,
  display_my_name: DisplayMyName,
  users: Users,
  user_detail: UserDetail,

  // crawler
  jobs: Jobs,
  jobs_add_edit: JobsAddEdit,
  queue_errors: QueueErrors,
};

export default connect(
  {
    currentPage: 'currentPage'
  },
  {},
  class Main extends Component {
    _render_route_link(link_name, link_href) {
      let route = <a href={link_href}>{link_name}</a>;
      if (this.props.currentPage === link_name) {
        route = <a className="selected_route" href={link_href}>{link_name}</a>;
      }
      return route;
    }

    render() {
      const Page = pages[ this.props.currentPage ];
      return (
        <div className="App">
          <div className="App-header">
            <div className="header_init">
              <img src={cerebral_logo} className="cerebral_logo" alt="cerebral logo"/>
              <h2>Scrap Cerebral 2</h2>
            </div>
            <div className="header_end">
              <img src={react_logo} className="react_logo" alt="logo"/>
            </div>
          </div>
          <ul className="menu">
            <li>
              {this._render_route_link('home', '/')}
            </li>
            <li>
              {this._render_route_link('display_my_name', '/display_my_name')}
            </li>
            <li>
              {this._render_route_link('users', '/users')}
            </li>
            <li>
              {this._render_route_link('jobs', '/jobs')}
            </li>
            <li>
              {this._render_route_link('add new job', '/jobs/add')}
            </li>
            <li>
              {this._render_route_link('queue_errors', '/queue_errors')}
            </li>
          </ul>

          <Page />

        </div>

      );
    }
  }
)
