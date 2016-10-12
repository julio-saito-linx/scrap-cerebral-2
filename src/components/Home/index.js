import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import cerebral_logo_png from './assets/cerebral.png';

export default connect(
  {},
  {},
  class Home extends Component {
    render() {
      return (
        <section className="main">
          <h1>Home</h1>

          <p>made with Cerebral 2</p>

          <img src={cerebral_logo_png} className="cerebral_large_logo" alt="cerebral large logo"/>

          <p>
            <a href="http://cerebral.github.io/cerebral-website/">web site</a>
          </p>

          <p>
            <a href="https://github.com/cerebral/cerebral">github</a>
          </p>

        </section>
      );
    }
  }
)
