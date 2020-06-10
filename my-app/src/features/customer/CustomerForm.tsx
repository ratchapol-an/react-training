import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import { withFormik, FormikProps } from "formik";
import { object, string, InferType, bool } from "yup";
import { CustomerDTO } from "../../services/customerService";

const customerSchema = (minErrorMessage: string) =>
  object()
    .shape({
      email: string().email("Invalid email").required("Please enter email"),
      password: string().min(6, minErrorMessage).required(),
      city: string().max(20).required(),
      state: string().required(),
      zipCode: string().max(6).notRequired(),
      isSubscribed: bool().required()
    })
    .defined();

type FormValues = InferType<ReturnType<typeof customerSchema>>;
type OtherProps = {
  formErrorMessage: string;
};

const InnerForm: React.FC<FormikProps<FormValues> & OtherProps> = (props) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    errors,
    touched,
    values,
    formErrorMessage,
  } = props;
  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={values.email}
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
            value={values.password}
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
            value={values.city}
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
            name="state"
            value={values.state}
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
            value={values.zipCode}
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
          checked={values.isSubscribed}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Form.Group>
      {formErrorMessage && <Alert variant="danger">{formErrorMessage}</Alert>}
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};

type CustomerProps = {
  formErrorMessage: string;
  onSaveCustomer: (customerDTO: CustomerDTO) => Promise<void>;
} & CustomerDTO;

const CustomerForm = withFormik<CustomerProps, FormValues>({
  // mapPropsToValues: (props) => ({
  //   city: props.city,
  //   email: props.email,
  //   isSubscribed: props.isSubscribed,
  //   password: props.password,
  //   state: props.stateId.toString(),
  //   zipCode: props.zipCode,
  // }),
  mapPropsToValues: ({
    city,
    email,
    isSubscribed,
    password,
    stateId,
    zipCode,
  }) => {
    return {
      city,
      email,
      isSubscribed,
      password,
      zipCode: zipCode ?? '',
      state: stateId ? stateId.toString() : "",
    };
  },
  validationSchema: (props: CustomerProps) =>
    customerSchema('สมมติว่าerrorมันมาจากข้างนอก'),
  // validate: (values, props) => {
  //   const errors: FormikErrors<FormValues> = {};
  //   if (!values.email) {
  //     errors.email = "Please enter your email.";
  //   }

  //   return errors;
  // },
  handleSubmit: async ({email, password, city, state, zipCode, isSubscribed}, formikBag) => {
    
    await formikBag.props.onSaveCustomer({
      email,
      password,
      city,
      stateId: Number.parseInt(state, 10),
      customerId: formikBag.props.customerId,
      isSubscribed,
      zipCode,
    });
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default CustomerForm;
