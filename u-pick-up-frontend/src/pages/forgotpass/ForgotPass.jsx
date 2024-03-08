import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ForgotPassValidation } from '../../yup validation/ForgotPassValidation';
import './ForgotPass.css';
import sendResetPassEmail from '../../api/sendResetPassEmail'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const ForgotPassword = () => {
    const initialValues = {
        email: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await sendResetPassEmail({
                email: values.email
            });
            console.log('Reset password email sent successfully');
        } catch (error) {
            console.error('Error sending reset password email:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="forgot-pass-page">
            <Link to="/" className="list-leftbar">
                <FontAwesomeIcon icon={faCircleLeft} className='forgot-pass-back' />
            </Link>
            
            <div className="forgot-password-container">
                <h2 className="forgot-password-heading">Forgot Password</h2>
                <div className="line"></div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ForgotPassValidation}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="forgot-password-form">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Enter your email" 
                                    className="form-input" 
                                />
                                <ErrorMessage 
                                    name="email" 
                                    component="p" 
                                    className="error-message" 
                                />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="forgot-submit-button">
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPassword;
