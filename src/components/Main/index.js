import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import cerebral_logo from './assets/cerebral_logo_bg.svg';
import react_logo from './assets/logo.svg';
import './main.css';
import Users from '../Users';
import UserDetail from '../UserDetail';
import Jobs from '../Crawler/Jobs';
import JobsAddEdit from '../Crawler/JobsAddEdit';
import QueueTasks from '../QueueTasks/index';
import { Label } from 'semantic-ui-react'
import queue_list_common from '../../computed/queue_list_common';
import queue_list_error from '../../computed/queue_list_error';

const pages = {
  users: Users,
  user_detail: UserDetail,
  jobs: Jobs,
  jobs_add_edit: JobsAddEdit,
  queue_tasks: QueueTasks,
};

export default connect(
  {
    currentPage: 'currentPage',
    queues_keys_common: queue_list_common,
    queues_keys_error: queue_list_error,
    all_firebase_listening_loaded: 'all_firebase_listening_loaded',
  },
  {
    listen_to_firebase: 'listen_to_firebase',
  },
  class Main extends Component {

    componentDidMount() {
      if (!this.props.all_firebase_listening_loaded) {
        this.props.listen_to_firebase();
      }
    }

    _render_route_link(link_name, link_href) {
      let route = <a href={link_href}>{link_name}</a>;
      if (this.props.currentPage === link_name) {
        route = <a className="selected_route" href={link_href}>{link_name}</a>;
      }
      return route;
    }

    render() {
      const Page = pages[this.props.currentPage];
      

      return (
        <div className="App">
          <div className="app-header">
            <div className="header_init">
              <img src={cerebral_logo} className="cerebral_logo" alt="cerebral logo"/>
              <h2>Scrap Cerebral 2</h2>
            </div>
            <div className="header_end">
              <img src={react_logo} className="react_logo" alt="logo"/>
            </div>
          </div>

          <div className="menu-top">
            <ul className="menu">
              <li>
                {this._render_route_link('jobs', '/jobs')}
              </li>
              <li>
                {this._render_route_link('tasks', '/queue_tasks')}
              </li>
              <li>
                {this._render_route_link('users', '/users')}
              </li>
            </ul>
            {this.props.queues_keys_common.length > 0 && (
              <Label circular color="green">
                {this.props.queues_keys_common.length}
              </Label>
            )}
            {this.props.queues_keys_error.length > 0 && (
              <Label circular color="red">
                {this.props.queues_keys_error.length}
              </Label>
            )}
          </div>

          {pages[this.props.currentPage] && (
            <section className="main-container">
              <Page />
            </section>
          )}

        </div>
      );
    }
  }
)
