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
    is_loading: 'queue_errors.is_loading',
    selected_task: 'queue_errors.selected_task',
  },
  {},
  class QueueErrors extends Component {
    render() {
      return (
        <section id="queue">
          <h1>QueueErrors</h1>
          {this.props.is_loading ? (
            <BigLoading />
          ) : (
            <Segment id="queue-segment">
              <Table unstackable celled definition>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>previous_state</Table.HeaderCell>
                    <Table.HeaderCell>error</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.queues_keys.map((key) => (
                    <QueueItem key={key} itemKey={key} queue={this.props.queues_list && this.props.queues_list[ key ]}/>
                  ))}
                </Table.Body>
              </Table>
              <pre>
                {this.props.selected_task && this.props.selected_task._error_details && this.props.selected_task._error_details.error_stack}
              </pre>
            </Segment>
          )}
        </section>
      );
    }
  }
)
