import React from 'react';
import { connect } from 'cerebral/react';
import { Table } from 'semantic-ui-react';

require('../../../shared_styles/table.css');
require('./index.css');

export default connect((props) => ({
    job: `jobs.list.${props.itemKey}`,
  }),
  function Item(props) {
    return (
      <Table.Row>
        <Table.Cell>
          <a
            className="item-link"
            href={`/jobs/${props.job.id}/edit`}
          >
            {props.job.job_name}
          </a>
        </Table.Cell>
        <Table.Cell>
          {props.job.initial_spec_state}
        </Table.Cell>
        <Table.Cell>
          {props.job.url}
        </Table.Cell>
      </Table.Row>
    )
  }
)
