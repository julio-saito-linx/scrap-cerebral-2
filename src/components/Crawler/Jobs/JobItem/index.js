import React from 'react';
import { connect } from 'cerebral/react';

require('../../../shared_styles/table.css');
require('./index.css');

export default connect((props) => ({
    job: `jobs.list.${props.itemKey}`,
  }),
  function Item(props) {
    return (
      <div className="item-row job-row">
        <div className="item-column">
          <a className="item-link"
             href={`/jobs/${props.job.id}/edit`}>{props.job.job_name}</a>
        </div>
        <div className="item-column">
          {props.job.initial_spec_state}
        </div>
        <div className="item-column">
          {props.job.url}
        </div>
      </div>

    )
  }
)
