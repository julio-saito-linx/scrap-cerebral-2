import React from 'react';
import { connect } from 'cerebral/react';

export default connect((props) => ({
    user: `users.list.${props.itemKey}`,
  }),
  function Item(props) {
    return (
      <div>
        {props.user.displayName}
      </div>
    )
  }
)
