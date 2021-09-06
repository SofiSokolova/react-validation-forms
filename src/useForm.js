import {useState} from "react";

export const useForm = ({
                         form,
                         validation,
                         onSubmit
                       }) => {
  const [values, setValues] = useState(form)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await validate(values, onSubmit, validation)
  }

  const handleBlur =  async e => {
    const { name, value } = e.target;

    try {
      await validation.fields[name].validate(value);
      const actualErrors = {...errors}
      
      delete actualErrors[name]
      setErrors(actualErrors)
    }
       catch (e) {
      setErrors({...errors, ...mapValidationErrors(e, name)})
    }
  };

  const mapValidationErrors = (yupError, name) => {
    let errors = {}

    if (!name) {
      yupError.inner.forEach((valErr, index) => {
        if (!errors[valErr.path]){
          errors[valErr.path] = yupError.errors[index]
        }
      })
    } else {
      errors[name] = yupError.errors[0]
    }
    
    return errors
  }

  const validate = (data, onValid, schema) => {
    return schema.validate(data, { abortEarly: false })
      .then(
        () => {
          setErrors({})
          onValid(data)
          setIsSubmitting(true);
        },
        err => {
          setErrors(mapValidationErrors(err))
        }
      )
  }

  return {handleChange, handleSubmit, handleBlur, values, errors, setErrors, isSubmitting}
};
