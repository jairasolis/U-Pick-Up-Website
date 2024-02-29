import React, { useState } from "react";
import "./SignUp1.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUpStudentValidation } from "../../../yup validation/SignUpStudentValidation";
import { checkEmailAvailability } from "../../../api/checkStudentEmail";
import { checkIdAvailability } from "../../../api/checkStudentId";
import { registerStudent } from "../../../api/registerStudent";

const SignUp1 = () => {
  const navigate = useNavigate();
  const [idAvailable, setIdAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    program: "",
    department: "",
    gender: "",
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
          first_name: values.firstName,
          middle_name: values.middleName,
          last_name: values.lastName,
          student_id: values.middleName,
          program: values.program,
          department: values.department,
          age: 21,
          gender: values.gender,
          email_ad: values.email,
          password: values.password,
          password_confirmation: values.confirmPassword,
        });

        if (response.status === 200) {
          navigate("/student/sign-in");
        } else {
          setFieldError("submit", "An error occurred");
        }
      } else {
        setFieldError("submit", "An error occurred");
      }
    } catch (error) {
      setFieldError("submit", "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sign-up-two">
      <div className="sign-up-wrap">
        <div className="sign-up-header">
          <img src="../images/upup.png" alt="" />
          <p> Receive on ease </p>
          <h3> Claim your materials with precision, no more wasted trips! </h3>
          <p> It’s simple to join </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpStudentValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="form-wrapper-two">
            <div className="input-field">
              <label htmlFor="firstName"> First Name </label>
              <Field type="text" name="firstName" id="firstName" placeholder="Your First Name" />
              <ErrorMessage name="firstName" component="p" className="error-message" />
            </div>
            <div className="input-field">
              <label htmlFor="middleName"> Middle Name </label>
              <Field type="text" name="middleName" id="middleName" placeholder="Your Middle Name" />
              <ErrorMessage name="middleName" component="p" className="error-message" />
            </div>
            <div className="input-field">
              <label htmlFor="lastName"> Last Name </label>
              <Field type="text" name="lastName" id="lastName" placeholder="Your Last Name" />
              <ErrorMessage name="lastName" component="p" className="error-message" />
            </div>
            <div className="input-field">
              <label htmlFor="course">Course/Program</label>
              <Field as="select" name="course" id="course">
                <option value=""></option>
                <option value="course1">AB COMM</option>
                <option value="course2">AB POLSCI</option>
                <option value="course3">BEED</option>
                <option value="course4">BSA</option>
                <option value="course5">BSAIS</option>
                <option value="course6">BSARCH</option>
                <option value="course7">BSCE</option>
                <option value="course8">BSCPE</option>
                <option value="course9">BSCRIM</option>
                <option value="course10">BSEE</option>
                <option value="course11">BSECE</option>
                <option value="course12">BSHM</option>
                <option value="course13">BSIT</option>
                <option value="course14">BSMA</option>
                <option value="course15">BSME</option>
                <option value="course16">BSMLS</option>
                <option value="course17">BSN</option>
                <option value="course18">BSPHARMA</option>
                <option value="course19">BSPSYCH</option>
                <option value="course20">BSTM</option>
                <option value="course21">BSBA-FM</option>
                <option value="course22">BSBA-MM</option>
                <option value="course23">BSED-ENGLISH</option>
                <option value="course24">BSED-MATH</option>
                <option value="course25">BSED-SCIENCE</option>
                <option value="course26">BSED-SOCIAL STUDIES</option>
              </Field>
              <ErrorMessage name="course" component="p" className="error-message" />
              </div>
              <div className="input-field">
                <label htmlFor="department">Department</label>
                <Field as="select" name="department" id="department">
                  <option value=""></option>
                  <option value="department1">CAS</option>
                  <option value="department2">CAHS</option>
                  <option value="department">CEA</option>
                  <option value="department">CELA</option>
                  <option value="department">CITE</option>
                  <option value="department">CMA</option>
                  <option value="department">CCJE</option>
                </Field>
                <ErrorMessage name="department" component="p" className="error-message" />
              </div>
              <div className="input-field">
                <label htmlFor="gender">Gender</label>
                <Field as="select" name="gender" id="gender">
                  <option value=""></option>
                  <option value="gender1">Female</option>
                  <option value="gender2">Male</option>
                </Field>
                <ErrorMessage name="gender" component="p" className="error-message" />
              </div>
              <button type="submit" className="next-btn" disabled={isSubmitting}> Next </button>
              <ErrorMessage name="submit" component="p" className="error-message" />
            </Form>
          )}
        </Formik>
        <div className="have-account-two">
          <p>
            Already have an account?{" "}
            <Link to="/student/sign-in">
              <span> SIGN IN! </span>{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp1;
