import React, {useState} from 'react'
import './SignIn2.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignIn2 = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const initialValues = {
    student_id: '',
    password: ''
  };

  const validate = Yup.object({
    student_id: Yup.string()
      .required('Student ID is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/student-login', {
        student_id: values.student_id,
        password: values.password
      });
  
      console.log('Response:', response.data);
  
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        navigate('/student/home');
      } else {
        setErrorMessage('An error occurred');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid student ID or password');
      } else {
        setErrorMessage('An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };


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
              <div className={`input-field-two ${errors.student_id && touched.student_id ? 'error' : ''}`}>
                <label htmlFor="idNum"> ID Number </label>
                <Field 
                  type="text" 
                  placeholder='Your student number' 
                  id="idNum" name="student_id" />
                <ErrorMessage name="student_id" component="p" className="error-message" />
              </div>
              <div className={`input-field-two ${errors.password && touched.password ? 'error' : ''}`}>
                <label htmlFor="password"> Password </label>
                <Field 
                  type="password" 
                  placeholder='Enter password' 
                  id="password" name="password" />
                <ErrorMessage name="password" component="p" className="error-message" />
              </div>
              <button type="submit" className="sign-up-btn" disabled={isSubmitting}> Sign In </button>
            </Form>
          )}
        </Formik>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="dhave-account-two">
            <p>Don’t have an account?<Link to="/student/sign-up"> <span> SIGN UP! </span> </Link> </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn2
