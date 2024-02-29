import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ResetPassValidation } from '../../yup validation/ResetPassValidation';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPass.css'; // Import the CSS file
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
        <div className="reset-pass-page"> {/* Apply the CSS class for centering */}
            <div className="reset-password-container"> {/* Apply the CSS class for container */}
                <h2 className="reset-password-heading">Reset Password</h2>
                <div className="line"></div> {/* Apply the CSS class for the line */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={ResetPassValidation}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
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
                                    className="error" 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Enter your new password" 
                                    className="form-input" 
                                />
                                <ErrorMessage 
                                    name="password" 
                                    component="p"
                                    className="error" 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <Field 
                                    type="password" 
                                    name="confirmPassword" 
                                    id="confirmPassword"
                                    placeholder="Confirm your new password" 
                                    className="form-input" 
                                />
                                <ErrorMessage 
                                    name="confirmPassword" 
                                    component="p" 
                                    className="error" 
                                />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="submit-button">
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ResetPassword;
