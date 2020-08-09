import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const NewForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log("woah there the status changed", status);

    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div>
      <h1>User Onboarding</h1>
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" type="text" name="name" />

        <label htmlFor="email">Email</label>
        <Field id="email" type="email" name="email" />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <Field id="password" type="password" name="password" />
        {touched.password && errors.password && <p>{errors.password}</p>}

        <label htmlFor="termsOfService">Terms of Service</label>
        <Field
          id="termsOfService"
          type="checkbox"
          name="termsOfService"
          checked={values.termsOfService}
        />
        <button type="submit">Submit Here</button>
      </Form>
      {user.map(person => {
        return (
          <ul>
            <li>Name: {person.name}</li>
            <li>Email: {person.email}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikNewForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      TermsofService: props.termsOfService || false
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(Response => {
        setStatus(Response.data);
        resetForm();
      })
      .catch(error => console.log(error.response));
  }
})(NewForm);

export default FormikNewForm;
