import React from 'react';
import { connect } from 'cerebral/react';
require('../../shared_styles/table.css');
require('./index.css');

export default connect((props) => ({
    user: `users.list.${props.itemKey}`,
  }),
  function Item(props) {
    return (
      <div className="item-row user-item-row">
        <div className="item-column">
          <img
            className="item-photo user-item-photo"
            src={props.user.photoURL}
            alt={props.user.displayName}
          />
        </div>
        <div className="item-column">
          <a className="item-link"
            href={`/users/${props.user.uid}`}>{props.user.displayName}
          </a>
        </div>
      </div>
    )
  }
)
