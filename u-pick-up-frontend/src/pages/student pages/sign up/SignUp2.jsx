import React from 'react'
import './SignUp2.css'
import { Link } from 'react-router-dom';


const SignIn2 = () => {
  return (
    <div className='sign-up-two'>
      <div className="sign-up-wrap">
        <div className="sign-up-header">
          <img src="../images/upup.png" alt="" />
          <p> receive on ease </p>
          <h3> Claim your materials with precision, no more wasted trips! </h3>
          <p>It’s simple to join</p>
        </div>

        <div className="form-wrapper-two">
          <div className="input-field-two">
            <label htmlFor="emailAd"> Email Address </label>
            <input type="text" className="emailAd" placeholder='abc.up@phinmaed.com' id="emailAd" required />
          </div>
          <div className="input-field-two">
            <label htmlFor="idNum"> ID Number </label>
            <input type="text" className="idNum" placeholder='your student number' id="idNum" required />     
          </div>
          <div className="input-field-two">
            <label htmlFor="password"> Password </label>
            <input type="password" className="password" placeholder='enter password' id="password" required />
          </div>
          <div className="input-field-two">
            <label htmlFor="confirmPass"> Confirm Password </label>
            <input type="password" className="confirmPass" placeholder='confirm password' id="confirmPass" required />
          </div>
        </div>

        <Link to="/student/sign-in">
          <button type="submit" className="sign-up-btn"> Sign Up </button>
        </Link>

        <div className="have-account-two">
          <p>Already have an account? <Link to="/student/sign-in"> <span> SIGN IN! </span> </Link> </p>
        </div>
        
      </div>
    </div>
  )
}

export default SignIn2
