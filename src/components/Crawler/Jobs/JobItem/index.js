import React from 'react';
import { connect } from 'cerebral/react';
import { Table, Button } from 'semantic-ui-react';

require('../../../shared_styles/table.css');
require('./index.css');

export default connect((props) => ({
    job: `jobs.list.${props.itemKey}`,
  }),
  {
    jobSelected: 'jobs.jobSelected',
    jobRemoveClicked: 'jobs.jobRemoveClicked',
  },
  function Item(props) {
    const _removeJob = (ev) => {
      ev.stopPropagation();
      props.jobRemoveClicked({id: props.job.id});
    };

    return (
      <Table.Row
        className="clickable"
        onClick={() => props.jobSelected({job: props.job})}
      >
        <Table.Cell>
          {props.job.job_name}
        </Table.Cell>
        <Table.Cell>
          {props.job.url}
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
