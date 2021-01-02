import React from 'react';
import { connect } from 'react-redux';
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
        <h1 className="ui header">SIGN IN</h1>
        <AuthForm onSubmit={this.onSubmit} error={this.props.error} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.auth.error };
};

export default connect(mapStateToProps, { signIn, authBegin })(SignIn);
