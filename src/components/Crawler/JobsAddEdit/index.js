import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import { Button, Form } from 'semantic-ui-react';
import BigLoading from '../../BigLoading/index';
import { Segment } from 'semantic-ui-react';
require('./index.css');

export default connect({
    new_job: 'jobs.new_job',
    selected_job: 'jobs.selected_job',
    is_loading: 'jobs.is_loading',
  }, {
    fieldChanged: 'jobs.fieldChanged',
    saveClicked: 'jobs.saveClicked',
    runClicked: 'jobs.runClicked',
    redirectedToList: 'jobs.redirectedToList',
  },
  class JobsAddEdit extends Component {

    _SaveOnClick = (ev) => {
      ev.preventDefault();
      this.props.saveClicked();
    };

    _RunOnClick = (ev) => {
      ev.preventDefault();
      this.props.runClicked({
        payload: {
          id: this.props.selected_job.id
        }
      });
    };

    _BackToList = (ev) => {
      ev.preventDefault();
      this.props.redirectedToList();
    };

    render() {
      const job = this.props.selected_job || this.props.new_job || {
          job_name: '',
          jquery_selector: '',
          url: '',
        };
      const job_type_path = this.props.selected_job ? 'jobs.selected_job' : 'jobs.new_job';
      const page_title = this.props.selected_job ? `${job.job_name}` : 'Add new job';
      return (
        <section id="jobs_add_edit">
          <h1>{page_title}</h1>
          { this.props.is_loading ? (
            <BigLoading />
          ) : (
            <Segment>
              <Form onSubmit={(ev) => ev.preventDefault()}>
                <Form.Field>
                  <label>Job name</label>
                  <input
                    placeholder='Job name'
                    value={job.job_name}
                    onChange={(event) => {
                      this.props.fieldChanged({
                        state_path: `${job_type_path}.job_name`,
                        value: event.target.value
                      })
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Initial spec state</label>
                  <input
                    placeholder='jquery_selector'
                    value={job.jquery_selector}
                    onChange={(event) => {
                      this.props.fieldChanged({
                        state_path: `${job_type_path}.jquery_selector`,
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
                        state_path: `${job_type_path}.url`,
                        value: event.target.value
                      })
                    }}
                  />
                </Form.Field>
                <div className="actions">
                  <Button
                    onClick={this._SaveOnClick}
                    content='Save'
                    icon='save'
                    labelPosition='left'
                  />
                  <Button
                    onClick={this._RunOnClick}
                    content='Run'
                    icon='check circle outline'
                    labelPosition='left'
                  />
                  <Button
                    onClick={this._BackToList}
                    content='Cancel'
                  />
                </div>
              </Form>
                {this.props.selected_job && (
                  <pre>
                    {this.props.selected_job.result}
                  </pre>
                )}
            </Segment>
          )}
        </section>
      )
    }
  }
)
