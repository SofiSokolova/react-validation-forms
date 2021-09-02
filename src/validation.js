import * as yup from 'yup';
import {useState} from "react";

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

export function mapValidationErrors(yupError) {
  let errors = {}
  yupError.inner.forEach((valErr, index) => {
    errors[valErr.path] = yupError.errors[index]
  })
  return errors
}

export function useYupValidation() {
  const [errors, setErrors] = useState({})
  function validate(data, onValid) {
    return signUpSchema.validate(data, { abortEarly: false }).then(
      () => {
        setErrors({})
        onValid(data)
      },
      err => {
        setErrors(mapValidationErrors(err))
      }
    )
  }
  return [errors, validate]
}

// export default function validation(values) {
//   let errors = {}
//   const regExpForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//  
//   if (!values.username.trim()) {
//     errors.username = 'Username required'
//   }
//  
//   if (!values.email.trim()) {
//     errors.email = 'Email required'
//   } else if (!regExpForEmail.test(values.email)) {
//     errors.email = 'Email is invalid'
//   }
//  
//   if (!values.age) {
//     errors.age = 'Age is required'
//   }
//  
//   return errors;
// }
