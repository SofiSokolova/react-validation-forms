import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(2, 'Too short :(')
    .max(50, 'Too long! 0_0'),


  email: yup.string()
    .required('Email is required')
    .email(),


  age: yup.number()
    .required('Age is required')
    .min(18, 'Too young :('),

})

