import { createContext } from "react";

const UserContext = createContext({
  userId: "",
  setUserId: (userId: string) => {},
});

export default UserContext;

