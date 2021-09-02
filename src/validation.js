import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  username: yup.string()
    .min(2, 'Too short :(')
    .max(50, 'Too long! 0_0')
    .required('Username is required'),

  email: yup.string()
    .email()
    .required('Email is required'),

  age: yup.number()
    .min(18, 'Too young :(')
    .required('Age is required')
})

