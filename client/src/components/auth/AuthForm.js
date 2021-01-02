import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthForm = (props) => {
  const [account, setAccount] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(account);
  };

  const renderError = (error) => {
    if (error.length > 0) {
      return (
        <div className="ui error message">
          <div className="ui relaxed list">
            {error.map(({ message, field }) => {
              return (
                <div className="item" key={message}>
                  <i className="exclamation circle icon"></i>
                  <div className="content">
                    <div
                      className="header"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {field}
                    </div>
                    <div className="description">{message}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <form className="ui form error" onSubmit={onSubmit}>
      <div className="field required">
        <label>Email</label>
        <input
          name="email"
          placeholder="Enter Email"
          value={account.email}
          onChange={onChange}
        />
      </div>
      <div className="field required">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={account.password}
          onChange={onChange}
          autoComplete="on"
        />
      </div>
      <div className="ui buttons">
        <Link to="/" className="ui button red">
          Cancel
        </Link>
        <div className="or"></div>
        <button className="ui button submit right floated green">Submit</button>
      </div>
      {renderError(props.error)}
    </form>
  );
};

export default AuthForm;
