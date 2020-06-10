import React, { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import CustomerForm from "../features/customer/CustomerForm";
import {
  CustomerDTO,
  getCustomer,
  saveCustomer,
} from "../services/customerService";

const Customer: React.FC = () => {
  const [customerDTO, setCustomerDTO] = useState<CustomerDTO>();
  const [formErrorMessage, setFormErrorMessage] = useState("");
  useEffect(() => {
    async function getCustomerDTO() {
      const customer = await getCustomer(2);
      setCustomerDTO(customer);
    }

    getCustomerDTO();
  }, []);

  const handleSaveCustomer = useCallback(async (customerDTO: CustomerDTO) => {
    try {
      await saveCustomer(customerDTO);
    } catch (ex) {
      setFormErrorMessage(ex);
    }
  }, []);

  return (
    <Container>
      {customerDTO ? (
        <CustomerForm
          formErrorMessage={formErrorMessage}
          onSaveCustomer={handleSaveCustomer}
          {...customerDTO}
        />
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
};

export default Customer;
