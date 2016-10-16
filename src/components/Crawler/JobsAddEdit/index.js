import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import { Button, Form } from 'semantic-ui-react';
import BigLoading from '../../BigLoading/index';
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

    _SaveOnClick = (ev) => {
      ev.preventDefault();
      this.props.saveClicked();
    };

    render() {
      const job = this.props.selected_job || this.props.new_job;
      const job_switcher = this.props.selected_job ? 'jobs.selected_job' : 'jobs.new_job';
      return (
        <section id="jobs_add_edit">
          <h1>Jobs</h1>
          { this.props.is_loading ? (
            <BigLoading />
          ) : (
            <div id="jobs_add_edit_main_container">
              <Form>
                <Form.Field>
                  <label>Job name</label>
                  <input
                    placeholder='Job name'
                    value={job.job_name}
                    onChange={(event) => {
                      this.props.fieldChanged({
                        state_path: `${job_switcher}.job_name`,
                        value: event.target.value
                      })
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Initial spec state</label>
                  <input
                    placeholder='initial_spec_state'
                    value={job.initial_spec_state}
                    onChange={(event) => {
                      this.props.fieldChanged({
                        state_path: `${job_switcher}.initial_spec_state`,
                        value: event.target.value
                      })
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>URL</label>
                  <input
                    placeholder='URL'
                    value={job.url}
                    onChange={(event) => {
                      this.props.fieldChanged({
                        state_path: `${job_switcher}.url`,
                        value: event.target.value
                      })
                    }}
                  />
                </Form.Field>
                <Button onClick={this._SaveOnClick}>
                  Save
                </Button>
              </Form>

            </div>
          )}
        </section>
      )
    }
  }
)
