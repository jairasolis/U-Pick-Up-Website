import * as Yup from "yup";

export const SignUp1StudentValidation = Yup.object({
  firstName: Yup.string().required("First name is required."),
  middleName: Yup.string().required("Middle name is required."),
  lastName: Yup.string().required("Last name is required."),
  program: Yup.string().required("Program is required."),
  department: Yup.string().required("Department is required."),
  gender: Yup.string().required("Gender is required."),
});