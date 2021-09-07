import React from 'react';
import {useForm} from "./useForm";
import {signUpSchema} from "./validation";

export const FormSignUp = () => {

  const {handleChange, handleSubmit, handleBlur, validate, setFieldError, values, errors} = useForm({
    form: {
      username: '',
      email: '',
      age: 0
    },
    validation: signUpSchema,
    onSubmit: async value => {}
  })
  
  const validation = async () => {
    try {
      await validate();
    } catch (fieldsErrors) {
      Object.keys(fieldsErrors).forEach((fieldName) => {
        setFieldError(fieldName, fieldsErrors[fieldName]);
      });
    }
  }
  

  return (
    <div className='form-content'>
      <form className='form-with-validation'>
        <h1>Sign Up here:</h1>
        <div className='sign-up-form-inputs'>
          <label htmlFor='username' className='form-label'>
            Username:
          </label>
          <input id='username'
                 type='text'
                 name='username'
                 className='form-input'
                 placeholder='Enter your name'
                 value={values.username}
                 onChange={handleChange}
                 onBlur={handleBlur}/>
          
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='sign-up-form-inputs'>
          <label htmlFor='email' className='form-label'>
            Email:
          </label>
          <input id='email'
                 type='email'
                 name='email'
                 className='form-input'
                 placeholder='Enter your email'
                 value={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}/>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='sign-up-form-inputs'>
          <label htmlFor='age' className='form-label'>
            Age:
          </label>
          <input id='age'
                 type='number'
                 name='age'
                 className='form-input'
                 placeholder='Enter your age'
                 value={values.age}
                 onChange={handleChange}
                 onBlur={handleBlur}/>
          {errors.age && <p>{errors.age}</p>}
        </div>
        <button className='form-sign-up-btn' type='button' onClick={() => validation()}>OK</button>
      </form>
    </div>
  )
}
