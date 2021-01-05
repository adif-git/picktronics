import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp, authBegin } from '../../actions';
import AuthForm from './AuthForm';

class SignUp extends React.Component {
  componentDidMount() {
    this.props.authBegin();
  }

  onSubmit = (formValues) => {
    this.props.signUp(formValues);
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui hidden divider"></div>
        <h1 className="ui teal header">SIGN UP</h1>
        <p>
          Already have an account? <Link to="/auth/signin">Sign In</Link>
        </p>
        <AuthForm onSubmit={this.onSubmit} error={this.props.error} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.auth.error };
};

export default connect(mapStateToProps, { signUp, authBegin })(SignUp);
