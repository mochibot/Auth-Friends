import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const FriendForm = ({touched, errors}) => {
  return (
    <div>
      <Form className='friends-form'>
        <div className='friends-field'>
          <label>Name:</label>
          <Field name='name'></Field>
          {touched.name && errors.name && <p className='friends-error'>{errors.name}</p>}
        </div>
        <div className='friends-field'>
          <label>Age:</label>
          <Field name='age'></Field>
          {touched.age && errors.age && <p className='friends-error'>{errors.age}</p>}
        </div>
        <div className='friends-field'>
          <label>Email:</label>
          <Field name='email'></Field>
          {touched.email && errors.email && <p className='friends-error'>{errors.email}</p>}
        </div>
        <button>Submit</button>
      </Form>
    </div>
  )
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      name: props.activeFriend.name || '',
      age: props.activeFriend.age|| '',
      email: props.activeFriend.email || ''
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().typeError('Age must be a number').min(0, 'Age cannot be < 0').required('Age is required'),
    email: Yup.string().email('Invalid email format').required('Email is required')
  }),

  handleSubmit(values, { props, resetForm }) {
    console.log('friend-info: ', values);
    if (props.activeFriend) {
      props.editFriend(props.activeFriend.id, values);
    } else {
      props.addFriend(values);
    }
    resetForm()
  }
})(FriendForm)