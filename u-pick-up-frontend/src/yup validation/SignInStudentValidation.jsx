import * as Yup from "yup";

export const SignInStudentValidation = Yup.object({
    student_id: Yup.string()
      .required("Student ID Number is required.")
      .matches(
        /^\d{2}-\d{4}-\d{6}$/,
        "ID Number must be in the format XX-XXXX-XXXXXX."
      ),
    password: Yup.string().required("Password is required."),
  });
