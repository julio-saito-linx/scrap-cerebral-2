import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import jobs_list from '../../../computed/jobs_list'
import JobItem from './JobItem/index'

require('./index.css');
require('../../shared_styles/loading_pulse.css');

export default connect(
  {
    jobs_list: jobs_list(),
    is_loading: 'crawler.jobs.is_loading',
  },
  {},
  class Jobs extends Component {
    render() {
      return (
        <section id="jobs">
          <h1>Jobs</h1>
          {this.props.is_loading ? (
            <div className="loading-pulse"></div>
          ) : (
            this.props.jobs_list.map((key) => (
              <JobItem key={key} itemKey={key} job={this.props.jobs && this.props.jobs[key]}/>
            ))
          )}
        </section>
      );
    }
  }
)
