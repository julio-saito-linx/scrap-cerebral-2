import React from 'react';
import { connect } from 'cerebral/react';

require('../../../shared_styles/table.css');
require('./index.css');

export default connect((props) => ({
    job: `crawler.jobs.list.${props.itemKey}`,
  }),
  function Item(props) {
    return (
    <div className="item-row job-row">
      <div className="item-column">
        {props.job.name}
      </div>
      <div className="item-column">
        <a className="item-link"
          href={`/crawler/jobs/${props.job.id}`}>{props.job.name}</a>
      </div>
    </div>

    )
  }
)
