import {useState, useEffect} from "react";

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

  const mapValidationErrors = (yupError) => {
    let errors = {}
    yupError.inner.forEach((valErr, index) => {
      errors[valErr.path] = yupError.errors[index]
    })
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

  return {handleChange, handleSubmit, values, errors, isSubmitting}
};
