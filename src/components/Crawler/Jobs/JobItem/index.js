import React from 'react';
import { connect } from 'cerebral/react';

export default connect((props) => ({
    job: `crawler.jobs.list.${props.itemKey}`,
  }),
  function Item(props) {
    return (
      <a href={`/crawler/jobs/${props.job.id}`}>{props.job.name}</a>
    )
  }
)
