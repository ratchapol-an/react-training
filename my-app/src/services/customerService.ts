export type CustomerDTO = {
  customerId: number;
  email: string;
  password: string;
  city: string;
  stateId: number;
  zipCode?: string;
  isSubscribed: boolean;
};

export const getCustomer = (customerId: number) => {
  return new Promise<CustomerDTO>((resolve) => {
    resolve({
      customerId: customerId,
      email: "ball@gmail.com",
      password: "a124554",
      city: "Test City",
      stateId: 1,
      //   zipCode: "10162",
      isSubscribed: true,
    });
  });
};

export const saveCustomer = (customer: CustomerDTO) => {
  return new Promise((resolve, reject) => {
    console.log(customer);
    setTimeout(() => {
      if (customer.customerId !== 1) {
        reject("error from backend.");
      }

      resolve();
    }, 2000);
  });
};
