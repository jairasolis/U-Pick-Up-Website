import React from 'react'
import './SignUp2.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignIn2 = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    idNumber: '',
    password: '',
    confirmPassword: ''
  };

  const validate = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    idNumber: Yup.string()
      .required('ID Number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/student-registration', {
        first_name: 'test',
        middle_name: 'test',
        last_name: 'test',
        student_id: values.idNumber,
        program: 'it',
        department: 'cite',
        age: 21,
        gender: 'df',
        email_ad: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword
      });

      console.log('Response:', response.data);

      if (response.status === 200) {
        navigate('/student/sign-in');
      } else {
        setFieldError('submit', 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setFieldError('submit', 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='sign-up-two'>
      <div className="sign-up-wrap">
        <div className="sign-up-header">
          <img src="../images/upup.png" alt="" />
          <p> receive on ease </p>
          <h3> Claim your materials with precision, no more wasted trips! </h3>
          <p>It’s simple to join</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={handleSubmit}>
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-wrapper-two">
              <div className={`input-field-two ${errors.email && touched.email ? 'error' : ''}`}>
                <label htmlFor="email"> Email Address </label>
                <Field 
                  type="text" 
                  name="email" 
                  id="email" 
                  placeholder='abc.up@phinmaed.com'/>
                <ErrorMessage 
                  name="email" 
                  component="p" 
                  className="error-message" />
              </div>
              <div className={`input-field-two ${errors.idNumber && touched.idNumber ? 'error' : ''}`}>
                <label htmlFor="idNumber"> ID Number </label>
                <Field 
                  type="text" 
                  name="idNumber" 
                  id="idNumber"
                  placeholder='Your student number' />
                <ErrorMessage 
                  name="idNumber" 
                  component="p" 
                  className="error-message" />
              </div>
              <div className={`input-field-two ${errors.password && touched.password ? 'error' : ''}`}>
                <label htmlFor="password"> Password </label>
                <Field 
                  type="password"  
                  name="password" 
                  id="password"
                  placeholder='Enter password' />
                <ErrorMessage 
                  name="password" 
                  component="p" 
                  className="error-message" />
              </div>
              <div className={`input-field-two ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}>
                <label htmlFor="confirmPassword"> Confirm Password </label>
                <Field 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  placeholder='Confirm password' />
                <ErrorMessage 
                  name="confirmPassword" 
                  component="p" 
                  className="error-message" />
              </div>
              <button type="submit" className="sign-up-btn" disabled={isSubmitting}>Sign Up</button>
              <ErrorMessage 
                name="submit" 
                component="p" 
                className="error-message" />
            </Form>
          )}
        </Formik>

        <div className="have-account-two">
          <p>Already have an account? <Link to="/student/sign-in"> <span> SIGN IN! </span> </Link> </p>
        </div>
        
      </div>
    </div>
  )
}

export default SignIn2
