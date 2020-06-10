import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withFormik, FormikProps } from "formik";
import { object, string, InferType } from "yup";

const customerSchema = object().shape({
  email: string().email("Invalid email").required("Please enter email"),
  password: string().min(6).required(),
  city: string().max(20).required(),
  state: string().required(),
  zipCode: string().max(6).notRequired(),
}).defined();

type FormValues = InferType<typeof customerSchema>;

const InnerForm: React.FC<FormikProps<FormValues>> = (props) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    errors,
    touched
  } = props;
  return (
    <Container>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              isInvalid={!!errors.email && touched.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              isInvalid={!!errors.password && touched.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.city && touched.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              defaultValue="0"
              name="state"
              isInvalid={!!errors.state && touched.state}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="1">Bangkok</option>
              <option value="2">Pattaya</option>
              <option value="3">Hua-hin</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zipCode"
              isInvalid={!!errors.zipCode && touched.zipCode}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zipCode}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Check me out"
            name="isSubscribed"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

type CustomerProps = {};

const Customer = withFormik<CustomerProps, FormValues>({
  mapPropsToValues: (props) => ({
    city: "",
    email: "",
    isSubscribed: false,
    password: "",
    state: "0",
    zipCode: "",
  }),
  validationSchema: customerSchema,
  // validate: (values, props) => {
  //   const errors: FormikErrors<FormValues> = {};
  //   if (!values.email) {
  //     errors.email = "Please enter your email.";
  //   }

  //   return errors;
  // },
  handleSubmit: (values, formikBag) => {
    console.log(values);
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default Customer;
