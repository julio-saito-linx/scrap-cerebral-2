import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import InputField from './InputField';
require('./index.css');

export default connect({
    new_job: 'jobs.new_job.*'
  }, {
    fieldChanged: 'jobs.fieldChanged',
    saveClicked: 'jobs.saveClicked',
  },
  class JobsCreate extends Component {
    render() {
      return (
        <div id="jobs_create_main_container">
          <div id="jobs_create_container">

            <InputField
              title="Job name"
              value={this.props.new_job.job_name}
              onChange={(event) => {
                this.props.fieldChanged({
                  state_path: 'jobs.new_job.job_name',
                  value: event.target.value
                })
              }}
            />

            <InputField
              title="initial_spec_state"
              value={this.props.new_job.initial_spec_state}
              onChange={(event) => {
                this.props.fieldChanged({
                  state_path: 'jobs.new_job.initial_spec_state',
                  value: event.target.value
                })
              }}
            />

            <InputField
              title="url"
              value={this.props.new_job.url}
              onChange={(event) => {
                this.props.fieldChanged({
                  state_path: 'jobs.new_job.url',
                  value: event.target.value
                })
              }}
            />

            <button
              onClick={() => this.props.saveClicked()}
            >
              save
            </button>

          </div>
        </div>
      )
    }
  }
)
