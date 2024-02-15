import * as Yup from "yup";

export const SignUpStudentValidation = Yup.object({
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
      /^\d{2}-\d{4}-\d{5,6}$/,
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