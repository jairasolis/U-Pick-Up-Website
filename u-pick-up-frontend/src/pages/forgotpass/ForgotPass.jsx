import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ForgotPassValidation } from '../../yup validation/ForgotPassValidation';
import './ForgotPass.css';
import sendResetPassEmail from '../../api/sendResetPassEmail'; 

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
        <div>
            <h2>Forgot Password</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={ForgotPassValidation}
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
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;