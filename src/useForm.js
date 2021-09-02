import {useState, useEffect} from "react";
import {mapValidationErrors, useYupValidation} from "./validation";
import {FormSignUp} from "./FormSignUp";
//import {signUpSchema, useYupValidation} from "./validation";

export const useForm = validate => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    age: '',
  })


  //const [errors, setErrors] = useYupValidation()
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      //FormSignUp();
    }
  }, [errors]);


  const handleChange = event => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    
    setErrors(mapValidationErrors(values))
    setIsSubmitting(true);
  }
  
  return {handleChange, handleSubmit, values, errors, isSubmitting}
};
