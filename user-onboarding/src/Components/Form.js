import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

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

        <label htmlFor="password">Password</label>
        <Field id="password" type="password" name="password" />

        <label htmlFor="termsOfService">Terms of Service</label>
        <Field type="checkbox" name="checkbox" />

        <button type="submit">Submit Here</button>
      </Form>
    </div>
  );
};

const FormikNewForm = withFormik({
  mapPropsToValues(props) {
    console.log(props);
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      TermsofService: props.TermsofService || false
    };
  }
})(NewForm);

export default FormikNewForm;
