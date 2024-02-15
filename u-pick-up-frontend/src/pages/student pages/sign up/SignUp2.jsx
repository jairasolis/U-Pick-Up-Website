import React, { useState } from "react";
import "./SignUp2.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {SignUpStudentValidation} from '../../../yup validation/SignUpStudentValidation';
import { checkEmailAvailability } from "../../../api/checkStudentEmail";
import { checkIdAvailability } from "../../../api/checkStudentId";
import { registerStudent } from "../../../api/registerStudent";

const SignUp2 = () => {
  const navigate = useNavigate();
  const [idAvailable, setIdAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);

  const initialValues = {
    email: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  };


  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    try {
      const isEmailAvailable = await checkEmailAvailability(values.email);
      const isIdAvailable = await checkIdAvailability(values.idNumber);
  
      if (isIdAvailable && isEmailAvailable) {
        const response = await registerStudent({
          first_name: "test",
          middle_name: "test",
          last_name: "test",
          student_id: values.idNumber,
          program: "it",
          department: "cite",
          age: 21,
          gender: "df",
          email_ad: values.email,
          password: values.password,
          password_confirmation: values.confirmPassword
        });
            
        console.log("Response:", response.data);
  
        if (response.status === 200) {
          navigate("/student/sign-in");
        } else {
          setFieldError("submit", "An error occurred");
        }
      } else if (idCheckResponse.status && emailCheck.status === 409) {
        setIdAvailable(false);
        setEmailAvailable(false);
        console.log("error2");
      } else {
        setFieldError("submit", "An error occurred");
        console.log("error3");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setIdAvailable(false);
        setEmailAvailable(false);
        console.log("error4");
      } else {
        setIdAvailable(false);
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
        <div className="sign-up-header">
          <img src="../images/upup.png" alt="" />
          <p> receive on ease </p>
          <h3> Claim your materials with precision, no more wasted trips! </h3>
          <p>It’s simple to join</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpStudentValidation}
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
                  errors.idNumber && touched.idNumber ? "error" : ""
                }`}
              >
                <label htmlFor="idNumber"> Student ID Number </label>
                <Field
                  type="text"
                  name="idNumber"
                  id="idNumber"
                  placeholder="Your Student ID Number"
                />
                <ErrorMessage
                  name="idNumber"
                  component="p"
                  className="error-message"
                />
                {!idAvailable && !(errors.idNumber && touched.idNumber) && (
                  <p className="error-message">
                    This Student ID Number is not available.
                  </p>
                )}
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
                  placeholder="Enter Your Password"
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
                  placeholder="Confirm Your Password"
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
            <Link to="/student/sign-in">
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