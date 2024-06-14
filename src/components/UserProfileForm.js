import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Invalid phone number').required('Phone number is required'),
  height: Yup.string().matches(/^\d+(\.\d{1,2})?$/, 'Invalid height'),
  weight: Yup.string().matches(/^\d+(\.\d{1,2})?$/, 'Invalid weight'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer')
});

const UserProfileForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        height: '',
        weight: '',
        age: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        // enviar os valores para o backend
        console.log(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <InputMask
              mask="(99) 99999-9999"
              onChange={e => setFieldValue('phone', e.target.value)}
            >
              {() => <Field name="phone" type="text" />}
            </InputMask>
            <ErrorMessage name="phone" component="div" />
          </div>
          <div>
            <label htmlFor="height">Height</label>
            <Field name="height" type="text" />
            <ErrorMessage name="height" component="div" />
          </div>
          <div>
            <label htmlFor="weight">Weight</label>
            <Field name="weight" type="text" />
            <ErrorMessage name="weight" component="div" />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <Field name="age" type="number" />
            <ErrorMessage name="age" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
