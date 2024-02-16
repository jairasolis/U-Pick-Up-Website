import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ResetPassValidation } from '../../yup validation/ResetPassValidation';
import './ResetPass.css';

const ResetPassword = ({ email }) => {
    const initialValues = {
        email: email || '',
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = (values, { setSubmitting }) => {
        //api call
        console.log('Submitting form:', values);
        setSubmitting(false);
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={ResetPassValidation}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="Enter your email"  
                            />
                            <ErrorMessage 
                            name="email" 
                            component="p" 
                            className="error" 
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Enter your new password" 
                            />
                            <ErrorMessage 
                                name="password" 
                                component="p"
                                className="error" 
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field 
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPassword"
                                placeholder="Confirm your new password" 
                            />
                            <ErrorMessage 
                                name="confirmPassword" 
                                component="p" 
                                className="error" 
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;
