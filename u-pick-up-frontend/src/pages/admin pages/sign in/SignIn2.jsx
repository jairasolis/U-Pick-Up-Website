import React, {useState, useEffect } from 'react'
import './SignIn2.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from "../../../auth/useAuth";


const SignIn2 = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { token, auth } = useAuth();

  const initialValues = {
    username: '',
    password: ''
  };

  const validate = Yup.object({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/admin-login', {
        username: values.username,
        password: values.password
      });
  
      console.log('Response:', response.data);
  
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        auth(true);
        // console.log("authhhhhh:", auth);
      } else {
        setErrorMessage('An error occurred');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('These credentials do not match our records');
      } else {
        setErrorMessage('An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/admin/dashboard");
    }
  }, [auth, navigate]);


  return (
    <div className='sign-in-two'>
      <div className="sign-in-wrap">
        <div className="sign-in-header">
          <img src="../images/upup.png" alt="" />
          <p> receive on ease </p>
          <h3> Welcome back! </h3>
        </div>
        <Formik 
          initialValues={initialValues} 
          validationSchema={validate} 
          onSubmit={onSubmit}>
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-wrapper-two">
              <div className={`input-field-two ${errors.username && touched.username ? 'error' : ''}`}>
                <label htmlFor="username"> Username </label>
                <Field 
                  type="text" 
                  className="username" 
                  placeholder='Your username' 
                  id="username" 
                  name="username" 
                  required />
                <ErrorMessage name="username" component="p" className="error-message" />
              </div>
              <div className={`input-field-two ${errors.password && touched.password ? 'error' : ''}`}>
                <label htmlFor="password"> Password </label>
                <Field 
                  type="password" 
                  className="password" 
                  placeholder='Enter password' 
                  id="password" 
                  name="password" 
                  required />
                <ErrorMessage name="password" component="p" className="error-message" />
              </div>
              <button type="submit" className="sign-up-btn" disabled={isSubmitting}> Sign In </button>
            </Form>
          )}
        </Formik>
        {errorMessage && <p className="error-message">{errorMessage}</p>}


        <div className="dhave-account-two">
          <p>Don’t have an account?<Link to="/admin/sign-up"> <span> SIGN UP! </span> </Link> </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn2
