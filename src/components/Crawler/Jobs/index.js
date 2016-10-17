import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import jobs_list from '../../../computed/jobs_list';
import JobItem from './JobItem/index';
import BigLoading from '../../BigLoading/index';
import { Table, Segment } from 'semantic-ui-react';
require('./index.css');

export default connect(
  {
    jobs_list: jobs_list(),
    is_loading: 'jobs.is_loading',
  },
  {},
  class Jobs extends Component {
    render() {
      return (
        <section id="jobs">
          <h1>Jobs</h1>
          {this.props.is_loading ? (
            <BigLoading />
          ) : (
            <Segment id="jobs-segment">
              <Table unstackable celled definition>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Initial state</Table.HeaderCell>
                    <Table.HeaderCell>URL</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.jobs_list.map((key) => (
                    <JobItem key={key} itemKey={key} job={this.props.jobs && this.props.jobs[ key ]}/>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          )}
        </section>
      );
    }
  }
)
