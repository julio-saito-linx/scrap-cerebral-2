import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import InputField from './InputField';
require('./index.css');

export default connect({
    new_job: `jobs.new_job.*`,
    selected_job: 'jobs.selected_job.*',
    is_loading: 'jobs.is_loading',
  }, {
    fieldChanged: 'jobs.fieldChanged',
    saveClicked: 'jobs.saveClicked',
  },
  class JobsAddEdit extends Component {
    render() {
      const job = this.props.selected_job || this.props.new_job;
      const job_switcher = this.props.selected_job ? 'jobs.selected_job' : 'jobs.new_job';
      return (
        <section id="jobs">
          <h1>Jobs</h1>
          { this.props.is_loading ? (
            <div className="loading-pulse"></div>
          ) : (
            <div id="jobs_add_edit_main_container">
              <div id="jobs_add_edit_container">
                <InputField
                  title="Job name"
                  value={job.job_name}
                  onChange={(event) => {
                    this.props.fieldChanged({
                      state_path: `${job_switcher}.job_name`,
                      value: event.target.value
                    })
                  }}
                />

                <InputField
                  title="initial_spec_state"
                  value={job.initial_spec_state}
                  onChange={(event) => {
                    this.props.fieldChanged({
                      state_path: `${job_switcher}.initial_spec_state`,
                      value: event.target.value
                    })
                  }}
                />

                <InputField
                  title="url"
                  value={job.url}
                  onChange={(event) => {
                    this.props.fieldChanged({
                      state_path: `${job_switcher}.url`,
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
          )}
        </section>
      )
    }
  }
)
