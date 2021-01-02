import React from 'react';
import { Link } from 'react-router-dom';

const GenericNotFound = () => {
  return (
    <div class="ui raised very padded text container segment">
      <div className="ui one statistics">
        <div class="ui huge grey statistic">
          <div class="value">404</div>
          <div class="label">PAGE NOT FOUND</div>
        </div>
      </div>
      <h1 className="ui center aligned header">
        Return to <Link to="/">home</Link>
      </h1>
    </div>
  );
};

export default GenericNotFound;
