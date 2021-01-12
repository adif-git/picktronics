import React from 'react';
import { Link } from 'react-router-dom';

const GenericNotFound = () => {
  return (
    <div className="ui raised very padded text container segment">
      <div className="ui one statistics">
        <div className="ui huge grey statistic">
          <div className="value">404</div>
          <div className="label">PAGE NOT FOUND</div>
        </div>
      </div>
      <h1 className="ui center aligned header">
        Return to <Link to="/">home</Link>
      </h1>
    </div>
  );
};

export default GenericNotFound;
