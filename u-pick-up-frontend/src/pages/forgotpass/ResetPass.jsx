import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ResetPassValidation } from '../../yup validation/ResetPassValidation';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPass.css';
import resetPassword from '../../api/resetPassword'; 

const ResetPassword = ({ email }) => {
    const navigate = useNavigate();
    const { token } = useParams();

    const initialValues = {
        email: email || '',
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await resetPassword({ 
                email_ad: values.email,
                password: values.password,
                password_confirmation: values.confirmPassword,
                token: token 
            });
            console.log('Password reset successful');
            navigate('/');
        } catch (error) {
            console.error('Password reset failed', error);
            setErrors({ password: 'Password reset failed' });
        } finally {
            setSubmitting(false);
        }
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
