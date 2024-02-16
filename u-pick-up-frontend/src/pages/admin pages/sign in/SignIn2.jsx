import React, {useState, useEffect } from 'react'
import './SignIn2.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useAuth from "../../../auth/useAuth";
import {SignInAdminValidation} from '../../../yup validation/SignInAdminValidation';
import { loginAdmin } from "../../../api/loginAdmin";


const SignIn2 = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const { token, auth } = useAuth();

  const initialValues = {
    username: '',
    password: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await loginAdmin({
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        const { token, id } = response.data; // Assuming the backend sends the user ID along with the token
        localStorage.setItem('authToken', token);
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        auth(true);

        // Insert login data
        insertLoginData(id);

        console.log("authhhhhh:", auth);

      } else {
        setErrorMessage('An error occurred');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('These credentials do not match our records');
      } else {
        setErrorMessage('An error occurred');
      }
    } finally {
      
      setLoading(false);
      setSubmitting(false);

    }
  };

  const insertLoginData = (Id) => {
    axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/insert-login-data', { id: Id })
      .then(response => {
          // Handle success if needed
          console.log('Login data inserted successfully');
      })
      .catch(error => {
          console.error('Error inserting login data:', error);
      });
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
          validationSchema={SignInAdminValidation} 
          onSubmit={onSubmit}>
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-wrapper-two">
              <div className={`input-field-two ${errors.username && touched.username ? 'error' : ''}`}>
                <label htmlFor="username"> Username </label>
                <Field 
                  type="text" 
                  className="username" 
                  placeholder='Your Username' 
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
                  placeholder='Enter Your Password' 
                  id="password" 
                  name="password" 
                  required />
                <ErrorMessage name="password" component="p" className="error-message" />
              </div>
              <button type="submit" className="sign-up-btn" disabled={isSubmitting || loading}>
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="dhave-account-two">
          <p>Don’t have an account?<Link to="/admin/sign-up"> <span> SIGN UP! </span> </Link> </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn2;
