import React, { Component } from 'react';
import { connect } from 'cerebral/react';

export default connect(
  {
    // currentPage: 'main.currentPage',
  },
  {
  },
  class Home extends Component {
    render() {
      return (
        <section className="main">
          <h1>Home</h1>
        </section>
      );
    }
  }
)
