import React, { useState } from "react";
import "./SignUp2.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  const validate = Yup.object({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+up@phinmaed\.com$/,
        "Email must be in the format abc.up@phinmaed.com"
      )
      .email("Invalid email address.")
      .required("Email is required."),
    idNumber: Yup.string()
      .required("Student ID Number is required.")
      .matches(
        /^\d{2}-\d{4}-\d{6}$/,
        "Student ID Number must be in the format XX-XXXX-XXXXXX."
      ),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        "Password must have uppercase, lowercase, symbol, and number."
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match."),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    try {
      const emailCheck = await axios.get(
        `https://u-pick-up-y7qnw.ondigitalocean.app/api/student-registration/${values.email}`
      );
      const idCheckResponse = await axios.get(
        `https://u-pick-up-y7qnw.ondigitalocean.app/api/student-registration/${values.idNumber}`
      );
      setIdAvailable(true);
      setEmailAvailable(true);

      console.log("ID Check Response:", idCheckResponse.data);
      console.log("Email Check Response:", emailCheck.data);

      if (idCheckResponse.status && emailCheck.status === 200) {
        const isIdAvailable = idCheckResponse.data;
        const isEmailAvailable = emailCheck.data;

        console.log("ID Available:", isIdAvailable);
        console.log("Email Available:", isEmailAvailable);

        if (isIdAvailable && isEmailAvailable) {
          setIdAvailable(true);
          setEmailAvailable(true);

          const response = await axios.post(
            "https://u-pick-up-y7qnw.ondigitalocean.app/api/student-registration",
            {
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
              password_confirmation: values.confirmPassword,
            }
          );

          console.log("Response:", response.data);

          if (response.status === 200) {
            navigate("/student/sign-in");
          } else {
            setFieldError("submit", "An error occurred");
          }
        } else {
          setIdAvailable(false);
          setEmailAvailable(false);
          console.log("error1");
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
        console.log("error4");
      } else {
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
          validationSchema={validate}
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
