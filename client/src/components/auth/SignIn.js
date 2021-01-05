import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, authBegin } from '../../actions';
import AuthForm from './AuthForm';

class SignIn extends React.Component {
  componentDidMount() {
    this.props.authBegin();
  }

  onSubmit = (formValues) => {
    this.props.signIn(formValues);
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui hidden divider"></div>
        <h1 className="ui blue header">SIGN IN</h1>
        <p>
          Doesn't have an account yet? <Link to="/auth/signup">Sign Up</Link>
        </p>
        <AuthForm onSubmit={this.onSubmit} error={this.props.error} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.auth.error };
};

export default connect(mapStateToProps, { signIn, authBegin })(SignIn);
