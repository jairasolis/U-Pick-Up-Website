import React, { useState } from "react";
import "./SignUp1.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUpStudentValidation } from "../../../yup validation/SignUpStudentValidation";


const SignUp1 = () => {
  const navigate = useNavigate();

  // Retrieve muna yung data from localStorage or set initial values
  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    return storedData || {
      firstName: "",
      middleName: "",
      lastName: "",
      program: "",
      department: "",
      gender: "",
    };
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("submit has clicked!")

    try {
      console.log(values)

      setFormData(values);
      localStorage.setItem("formData", JSON.stringify(values));
      navigate("/student/sign-up-2"); 
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
          initialValues={formData}
          // validationSchema={SignUpStudentValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                <label htmlFor="program">Course/Program</label>
                <Field as="select" name="program" id="program">
                  <option value=""></option>
                  <option value="AB COMM">AB COMM</option>
                  <option value="AB POLSCI">AB POLSCI</option>
                  <option value="BEED">BEED</option>
                  <option value="BSA">BSA</option>
                  <option value="BSAIS">BSAIS</option>
                  <option value="BSARCH">BSARCH</option>
                  <option value="BSCE">BSCE</option>
                  <option value="BSCPE">BSCPE</option>
                  <option value="BSCRIM">BSCRIM</option>
                  <option value="BSEE">BSEE</option>
                  <option value="BSECE">BSECE</option>
                  <option value="BSHM">BSHM</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSMA">BSMA</option>
                  <option value="BSME">BSME</option>
                  <option value="BSMLS">BSMLS</option>
                  <option value="BSN">BSN</option>
                  <option value="BSPHARMA">BSPHARMA</option>
                  <option value="BSPSYCH">BSPSYCH</option>
                  <option value="BSTM">BSTM</option>
                  <option value="BSBA-FM">BSBA-FM</option>
                  <option value="BSBA-MM">BSBA-MM</option>
                  <option value="BSED-ENGLISH">BSED-ENGLISH</option>
                  <option value="BSED-MATH">BSED-MATH</option>
                  <option value="BSED-SCIENCE">BSED-SCIENCE</option>
                  <option value="BSED-SOCIAL STUDIES">BSED-SOCIAL STUDIES</option>                
                </Field>
                <ErrorMessage name="program" component="p" className="error-message" />
              </div>
              <div className="input-field">
                <label htmlFor="department">Department</label>
                <Field as="select" name="department" id="department">
                  <option value=""></option>
                  <option value="CAS">CAS</option>
                  <option value="CAHS">CAHS</option>
                  <option value="CEA">CEA</option>
                  <option value="CELA">CELA</option>
                  <option value="CITE">CITE</option>
                  <option value="CMA">CMA</option>
                  <option value="CCJE">CCJE</option>                </Field>
                <ErrorMessage name="department" component="p" className="error-message" />
              </div>
              <div className="input-field">
                <label htmlFor="gender">Gender</label>
                <Field as="select" name="gender" id="gender">
                  <option value=""></option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
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
