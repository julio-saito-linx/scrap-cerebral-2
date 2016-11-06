import React, { Component } from 'react';
import { connect } from 'cerebral/react';
import queue_list from '../../computed/queue_list';
import QueueItem from './QueueItem/index';
import BigLoading from '../BigLoading/index';
import { Table, Segment } from 'semantic-ui-react';
require('./index.css');

export default connect(
  {
    queues_keys: queue_list(),
    is_loading: 'queue_tasks.is_loading',
    selected_task_key: 'queue_tasks.selected_task_key',
    list: 'queue_tasks.list',
  },
  {},
  class QueueTasks extends Component {

    _get_error_stack() {
      const selectedTaskKey = this.props.selected_task_key;
      const errorDetails = selectedTaskKey && this.props.list[ selectedTaskKey ]._error_details;
      if (selectedTaskKey && errorDetails) {
        return errorDetails.error_stack;
      }
      return null;
    }

    render() {
      return (
        <section id="queue">
          <h1>Tasks</h1>
          <h4>firebase queue</h4>
          {this.props.is_loading ? (
            <BigLoading />
          ) : (
            <Segment id="queue-segment">
              <Table unstackable celled definition>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>previous_state</Table.HeaderCell>
                    <Table.HeaderCell>error</Table.HeaderCell>
                    <Table.HeaderCell>date</Table.HeaderCell>
                    <Table.HeaderCell className="th-actions"/>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.queues_keys.map((key) => (
                    <QueueItem
                      key={key}
                      itemKey={key}
                      task={this.props.list && this.props.list[ key ]}
                      selected_task_key={this.props.selected_task_key}
                    />
                  ))}
                </Table.Body>
              </Table>
              <pre className="pre-error-stack">
                {this._get_error_stack()}
              </pre>
            </Segment>
          )}
        </section>
      );
    }
  }
)
