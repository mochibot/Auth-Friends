import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const Login = ({ errors, touched, isSubmitting }) => {

  return (
    <div>
      {isSubmitting && <div>Submitting</div>}
      <Form className='login-form'>
        <div className='login-field'>
          <label>Username: </label>
          <Field name='username'></Field>
          {touched.username && errors.username && <p className='login-error'>{errors.username}</p>}
        </div>
        <div className='login-field'>
          <label>Password: </label>
          <Field type='password' name='password'></Field>
          {touched.password && errors.password && <p className='login-error'>{errors.password}</p>}
        </div>
        <button disabled={isSubmitting}>Submit</button>
      </Form>
    </div>
  )
}

export default withFormik({
  mapPropsToValues: ({ username, password }) => {
    return {
      username: username || '',
      password: password || ''
    }
  },
  
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    console.log('login: ', values);
    setSubmitting(true);
    axios.post('http://localhost:5000/api/login', values)
      .then(response => {
        resetForm()
        console.log(response);
        localStorage.setItem('userToken', response.data.payload);
        props.setIsLoggedIn(true);
        setSubmitting(false);
        props.history.push('/friends');
      })
      .catch(error => {
        console.log(error.message);
        setErrors({
          password: 'Username or Password incorrect. Please see Readme'
        })
        setSubmitting(false);
      })
  }
})(Login);