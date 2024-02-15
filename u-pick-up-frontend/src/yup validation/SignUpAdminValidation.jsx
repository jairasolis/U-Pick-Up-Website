import * as Yup from 'yup';

export const SignUpAdminValidation = Yup.object({
    email: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+up@phinmaed\.com$/, 
      'Email must be in the format abc.up@phinmaed.com.')
      .email('Invalid email address.')
      .required('Email is required.'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters.')
      .max(10, 'Username cannot exceed 10 characters.')
      .required('Username is required.'),
    department:Yup.string()
      .required('Department is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(6, 'Password must be at least 6 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        'Password must have uppercase, lowercase, symbol, and number.'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
  });
