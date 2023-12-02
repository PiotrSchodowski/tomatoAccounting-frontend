import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/auth.service";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const tomatoes = "tomatoes";
  const [user, setUser] = useState({
    email: "",
    [tomatoes]: [],
    message: "",
  });

  useEffect(() => {
    const storedUser = AuthService.getCurrentUser;
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
