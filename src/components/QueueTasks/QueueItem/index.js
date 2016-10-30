import React from 'react';
import moment from 'moment';
import { connect } from 'cerebral/react';
import { Table, Button } from 'semantic-ui-react';

require('../../shared_styles/table.css');
require('./index.css');

export default connect((props) => ({
    task: `queue_tasks.list.${props.itemKey}`,
    selected_task_key: 'queue_tasks.selected_task_key',
  }),
  {
    taskSelected: 'queue_tasks.taskSelected',
    queueRemoveClicked: 'queue_tasks.queueRemoveClicked',
  },
  function Item(props) {
    const _removeJob = (ev) => {
      ev.stopPropagation();
      props.queueRemoveClicked({selected_task_key: props.itemKey});
    };

    const _table_row_className = () => {
      return ['clickable', props.selected_task_key === props.itemKey ? 'row-selected' : ''].join(' ')
    };

    const _get_task_name = () => {
      if (props.task._error_details) {
        return props.task._error_details.previous_state;
      } else {
        return props.task._state;
      }
    };

    const _get_task_value = () => {
      if (props.task._error_details) {
        return props.task._error_details.error;
      } else {
        return props.task.data;
      }
    };

    return (
      <Table.Row
        className={_table_row_className()}
        onClick={() => props.taskSelected({selected_task_key: props.itemKey})}
      >
        <Table.Cell>
          {_get_task_name()}
        </Table.Cell>
        <Table.Cell>
          {_get_task_value()}
        </Table.Cell>
        <Table.Cell>
          {moment(props.task._state_changed).format('YYYY-MM-DD HH:mm:ss') }
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
