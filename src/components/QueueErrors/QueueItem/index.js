import React from 'react';
import moment from 'moment';
import { connect } from 'cerebral/react';
import { Table, Button } from 'semantic-ui-react';

require('../../shared_styles/table.css');
require('./index.css');

export default connect((props) => ({
    task: `queue_errors.list.${props.itemKey}`,
    selected_task_key: 'queue_errors.selected_task_key',
  }),
  {
    taskSelected: 'queue_errors.taskSelected',
    queueRemoveClicked: 'queue_errors.queueRemoveClicked',
  },
  function Item(props) {
    const _removeJob = (ev) => {
      ev.stopPropagation();
      props.queueRemoveClicked({id: props.task.id});
    };
    return (
      <Table.Row
        className={['clickable', props.selected_task_key === props.itemKey ? 'row-selected' : '']}
        onClick={() => props.taskSelected({selected_task_key: props.itemKey})}
      >
        <Table.Cell>
          {props.task._error_details.previous_state}
        </Table.Cell>
        <Table.Cell>
          {props.task._error_details.error}
        </Table.Cell>
        <Table.Cell>
          {moment(props.task._state_changed).format('YYYY-MM-DD HH:mm:SS') }
        </Table.Cell>
        <Table.Cell>
          <Button
            icon="trash"
            content="del"
            size="mini"
            className="delete_button_soft_red"
            onClick={_removeJob}
          />
        </Table.Cell>
      </Table.Row>
    )
  }
)
