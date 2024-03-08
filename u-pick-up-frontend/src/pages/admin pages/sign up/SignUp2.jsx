import React, { useState } from "react";
import "./SignUp2.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignUpAdminValidation } from "../../../yup validation/SignUpAdminValidation";
import { checkEmailAvailability } from "../../../api/checkAdminEmail";
import { checkUsernameAvailability } from "../../../api/checkAdminUsername";
import { registerAdmin } from "../../../api/registerAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'

const SignUp2 = () => {
  const navigate = useNavigate();
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);

  const initialValues = {
    email: "",
    username: "",
    department: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const isEmailAvailable = await checkEmailAvailability(values.email);
      const isUsernameAvailable = await checkUsernameAvailability(
        values.username
      );

      if (isUsernameAvailable && isEmailAvailable) {
        const response = await registerAdmin({
          email_ad: values.email,
          username: values.username,
          department: values.department,
          password: values.password,
          password_confirmation: values.confirmPassword,
        });

        console.log("Response:", response.data);

        if (response.status === 200) {
          navigate("/admin/sign-in");
        } else {
          setFieldError("submit", "An error occurred");
        }
      } else if (idCheckResponse.status && emailCheck.status === 409) {
        setUsernameAvailable(false);
        setEmailAvailable(false);
        console.log("error2");
      } else {
        setFieldError("submit", "An error occurred");
        console.log("error3");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUsernameAvailable(false);
        setEmailAvailable(false);
        console.log("error4");
      } else {
        setUsernameAvailable(false);
        setEmailAvailable(false);
        setFieldError("submit", "An error occurred");
        console.log("error5");
      }
    } finally {
      setSubmitting(false);
      console.log("error6");
    }
  };

  return (
    <div className="sign-up-two">
      <div className="sign-up-wrap">
        <Link to="/admin/sign-in">
            <FontAwesomeIcon icon={faCircleLeft} className='forgot-pass-back' />
        </Link>
        <div className="sign-up-header">
          <img src="../images/upup.png" alt="" />
          <p> receive on ease </p>
          <h3> Claim your materials with precision, no more wasted trips! </h3>
          <p>It’s simple to join</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpAdminValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-wrapper-two">
              <div
                className={`input-field-two ${
                  errors.email && touched.email ? "error" : ""
                }`}
              >
                <label htmlFor="email"> Email Address </label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  placeholder="abc.up@phinmaed.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="error-message"
                />
                {!emailAvailable && !(errors.email && touched.email) && (
                  <p className="error-message">
                    This email address is not available.
                  </p>
                )}
              </div>
              <div
                className={`input-field-two ${
                  errors.username && touched.username ? "error" : ""
                }`}
              >
                <label htmlFor="username"> Username </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="error-message"
                />
                {!usernameAvailable &&
                  !(errors.username && touched.username) && (
                    <p className="error-message">
                      This Username is not available.
                    </p>
                  )}
              </div>
              <div
                className={`input-field-two ${
                  errors.department && touched.department ? "error" : ""
                }`}
              >
                <label htmlFor="department"> Department </label>
                <Field
                  type="text"
                  name="department"
                  id="department"
                  placeholder="Department"
                />
                <ErrorMessage
                  name="department"
                  component="p"
                  className="error-message"
                />
              </div>
              <div
                className={`input-field-two ${
                  errors.password && touched.password ? "error" : ""
                }`}
              >
                <label htmlFor="password"> Password </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="error-message"
                />
              </div>
              <div
                className={`input-field-two ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "error"
                    : ""
                }`}
              >
                <label htmlFor="confirmPassword"> Confirm Password </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="sign-up-btn"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
              <ErrorMessage
                name="submit"
                component="p"
                className="error-message"
              />
            </Form>
          )}
        </Formik>

        <div className="have-account-two">
          <p>
            Already have an account?{" "}
            <Link to="/admin/sign-in" style={{ textDecoration: "none" }}>
              {" "}
              <span> SIGN IN! </span>{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
