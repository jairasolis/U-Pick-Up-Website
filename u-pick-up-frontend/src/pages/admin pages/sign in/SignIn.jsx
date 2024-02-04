import React from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="wrapper">
      <div className="row">
        <div className="column-left">
        {/* <div className="left-box">
        </div> */}
        </div>
        <div className="column-right">
          <div className="form-box">
            <h2> Sign in to U-Pick Up </h2>
            <form action="#">
              <div className="input-field">
                <input type="text" className="idNum" id="idNum" required />
                <label htmlFor="email"> ID Number </label>
              </div>
              <div className="input-field">
                <input type="password" className="password" id="password" required />
                <label htmlFor="password"> Password </label>
              </div>
              <Link to="/home">
                <button type="submit" className="btn"> Sign In </button>
              </Link>
            </form>
            <div className="dhave-account">
              <p>Don’t have an account? <Link to="/sign-up"> <span>SIGN UP!</span> </Link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
