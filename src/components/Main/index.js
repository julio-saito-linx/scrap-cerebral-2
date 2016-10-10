import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import cerebral_logo from './assets/cerebral_logo_bg.svg';
import react_logo from './assets/logo.svg';
import './main.css';
import Home from '../Home';
import DisplayMyName from '../DisplayMyName/edit';

const pages = {
  home: Home,
  display_my_name: DisplayMyName
};

export default connect(
  {
    currentPage: 'currentPage'
  },
  {},
  class Main extends Component {
    _render_route_link(link_name, link_href) {
      if (this.props.currentPage === link_name) {
        return <a className="selected_route" href={link_href}>{link_name}</a>;
      }
      return <a href={link_href}>{link_name}</a>;
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
          </ul>

          <hr className="separator"/>

          <Page />

        </div>

      );
    }
  }
)
