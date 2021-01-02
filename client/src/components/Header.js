import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, signOut } from '../actions';

const Header = (props) => {
  const renderNotSignedIn = () => {
    return (
      <>
        <div className="item">
          <div className="ui tiny buttons">
            <Link to="/auth/signin" className="ui blue button">
              Sign In
            </Link>
            <div className="or"></div>
            <Link to="/auth/signup" className="ui teal button">
              Sign Up
            </Link>
          </div>
        </div>
      </>
    );
  };

  const renderSignedIn = () => {
    return (
      <>
        <div className="ui simple dropdown item">
          <i className="user icon"></i>
          {props.user.email}
          <i className="dropdown icon"></i>
          <div className="menu">
            <Link to="/auth/user" className="item">
              My Profile
            </Link>
            <Link to="/products" className="item">
              My Products
            </Link>
            <Link to="/orders" className="item">
              My Orders
            </Link>
          </div>
        </div>
        <div className="item">
          <div
            onClick={() => props.signOut()}
            className="ui inverted red button"
          >
            Sign Out
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="ui borderless top inverted menu attached">
      <Link to="/" className="ui header item">
        Picktronics
      </Link>
      <div className="right menu">
        {props.isSignedIn ? renderSignedIn() : renderNotSignedIn()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { signUp, signOut })(Header);
