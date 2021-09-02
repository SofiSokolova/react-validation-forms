import {useState, useEffect} from "react";
//import {signUpSchema, useYupValidation} from "./validation";

export const useForm = validate => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    age: '',
  })
  
  //const [errors, setErrors] = useYupValidation()
  const [errors, setErrors] = useState()
  
  const handleChange = event => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    
    setErrors(validate(values))
  }
  
  return {handleChange, handleSubmit, values, errors}
};
