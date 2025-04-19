// context/AuthContext.js
import React, { createContext, useState } from 'react';

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setemail] = useState(localStorage.getItem('email') || '');
  const [name, setname] = useState(localStorage.getItem('name') || '');
  const [islogged, setislogged] = useState(localStorage.getItem('islogged') === 'true');

  return (
    <Authcontext.Provider value={{ email, setemail, name, setname, islogged, setislogged }}>
      {children}
    </Authcontext.Provider>
  );
};
