import React from 'react';

const ProfileShow = (props) => {
  return (
    <div className="ui segments">
      <div className="ui black inverted segment">
        <h2 className="ui center aligned icon header">
          <i
            className="user circle outline icon"
            style={{ margin: '30px 0' }}
          ></i>
          {props.user.email}
        </h2>
      </div>
      <div className="ui segment">
        <div className="ui two small statistics">
          <div className="statistic">
            <div className="value">{props.statistics.products}</div>
            <div className="label">Number of Products</div>
          </div>
          <div className="statistic">
            <div className="value">{props.statistics.orders}</div>
            <div className="label">Number of Orders Submitted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShow;
