import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import jobs_list from '../../../computed/jobs_list';
import JobItem from './JobItem/index';
import BigLoading from '../../BigLoading/index';
import { Table, Segment, Button } from 'semantic-ui-react';
require('./index.css');

export default connect(
  {
    jobs_list: jobs_list,
    is_loading: 'jobs.is_loading',
  },
  {
    redirectedToAddJob: 'jobs.redirectedToAddJob',
  },
  class Jobs extends Component {
    render() {
      return (
        <section id="jobs">

          <div className="title-top">
            <h1>All jobs</h1>
            <Button
              onClick={() => this.props.redirectedToAddJob()}
            >
              Add new job
            </Button>
          </div>

          {this.props.is_loading ? (
            <BigLoading />
          ) : (
            <Segment id="jobs-segment">
              <Table unstackable celled>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>
                      Name
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Initial state
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      URL
                    </Table.HeaderCell>
                    <Table.HeaderCell className="deleteRowAction" />
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
