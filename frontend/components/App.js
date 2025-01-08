// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
// import { isValid } from 'ipaddr.js';
import React, { useEffect, useState } from 'react'
// import { use } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({ // This is a dictionary of validation error messages.
  // username
  username: 
  yup
  .string()
  .trim()
  .required('usernameRequired: username is required')
  .min(3,'usernameMin: username must be at least 3 characters')
  .max(20, 'usernameMax: username cannot exceed 20 characters'),
  // favLanguage
  favLanguage: yup
  .string()
  .trim()
  .required('favLanguageRequired: favLanguage is required')
  .oneOf(["javascript", "rust"],'favLanguageOptions: favLanguage must be either javascript or rust'),
  // favFood
  favFood: yup
  .string()
  .trim()
  .required('favFoodRequired: favFood is required')
  .oneOf(["broccoli", "spaghetti", "pizza"], 'favFoodOptions: favFood must be either broccoli, spaghetti or pizza'),
  agreement: 
  yup.boolean()
  .required('agreement is required')
  .oneOf([true], 'agreement must be accepted'),
})

// ✨ TASK: BUILD YOUR FORM SCHEMA HERE
// The schema should use the error messages contained in the object above.
const initialValues = () => ({
  username : "",
  favLanguage: "",
  favFood: "",
 agreement: false,

})

const initialErrors = () => ({
  username: "",
  favLanguage: "",
  favFood: "",
  agreement: ""
})

const initialDisabled = true;

export default function App() {

 
  // ✨ TASK: BUILD YOUR STATES HERE
  // You will need states to track (1) the form, (2) the validation errors,
  // (3) whether submit is disabled, (4) the success message from the server,
  // and (5) the failure message from the server.

  const [values, setValues] = useState(initialValues())
  const [errors, setErrors] = useState(initialErrors())
  const [success, setSuccess] = useState()
  const [failure, setFailure] = useState()
  const [enabled, setEnabled] = useState(false)

  // ✨ TASK: BUILD YOUR EFFECT HERE
  // Whenever the state of the form changes, validate it against the schema
  // and update the state that tracks whether the form is submittable.
   useEffect(() => {
        schema.isValid(values).then(setEnabled);
  },[values]);

  

  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
console.log('hey baby girl')
    let {type, name, checked, value} = evt.target;
    value = type == 'checkbox' ? checked : value
      // if( type == 'checkbox' ) value = checked;
        setValues({ ...values, [name]: value})

      
  }

  const onSubmit = evt => {
    // ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
    // Lots to do here! Prevent default behavior, disable the form to avoid
    // double submits, and POST the form data to the endpoint. On success, reset
    // the form. You must put the success and failure messages from the server
    // in the states you have reserved for them, and the form
    // should be re-enabled.

    evt.preventDefault()

    axios.post('https://webapis.bloomtechdev.com/registration', values)
       .then((res) => {
        setValues(initialValues())
        setSuccess(res.data.message)
        setFailure()
       })
       .catch((err) => {
        setFailure(err.response.data.message)
        setSuccess()
       })
  }

  return (
    <div> {/* TASK: COMPLETE THE JSX */}
      <h2>Create an Account</h2>
      <form onSubmit={onSubmit}>
      { success && <h4 className="success">{success}</h4>}
      { failure && <h4 className="error">{failure}</h4>}

        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input onChange={onChange} value={values.username} id="username" name="username" type="text" placeholder="Type Username" />
         {errors.username && <div className="validation">{errors.username}</div>}
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>Favorite Language:</legend>
            <label>
              <input onChange={onChange} checked={values.favLanguage == 'javascript'} type="radio" name="favLanguage" value="javascript" />
              javaScript
            </label>
            <label>
              <input onChange={onChange} checked={values.favLanguage == 'rust'} type="radio" name="favLanguage" value="rust" />
              Rust
            </label>
          </fieldset>
          {errors.favLanguage && <div className="validation">{errors.favLanguage}</div> }
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select onChange={onChange} value={values.favFood} id="favFood" name="favFood">
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          { errors.favFood && <div className="validation">{errors.favFood}</div>}
        </div>

        <div className="inputGroup">
          <label>
            <input onChange={onChange} checked={values.agreement} id="agreement" type="checkbox" name="agreement" />
            Agree to our terms
          </label>
          { errors.agreement && <div className="validation">{errors.agreement}</div>}
        </div>

        <div>
          <input type="submit" disabled={!enabled} />
        </div>
      </form>
    </div>
  )
}
