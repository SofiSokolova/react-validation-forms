import React from 'react';
import {useForm} from "./useForm";
import {signUpSchema} from "./validation";

export const FormSignUp = () => {

  const {handleChange, handleSubmit, handleBlur, values, errors, setErrors, isSubmitting} = useForm({
    form: {
      username: '',
      email: '',
      age: 0
    },
    validation: signUpSchema,
    onSubmit: async value => {
      try {
        await Promise.reject({
          errors: {
            username: 'Not unique'
          }
        })  
      } catch (e) {
        setErrors({ ...errors, ...e.errors })
      }
    }
  })


  return (
    <div className='form-content'>
      <form className='form-with-validation' onSubmit={handleSubmit}>
        <h1>Sign Up here:</h1>
        {Object.keys(errors).length === 0 && isSubmitting && (
          <span className="success-msg">Signed in successfully</span>
        )}
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
        <button className='form-sign-up-btn' type='submit'>Sign up</button>
      </form>
    </div>
  )
}
