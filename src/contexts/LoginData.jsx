/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';

export const LoginDataContext = createContext({});

export function LoginDataProvider({ children }) {
  const [emailId, setEmailId] = useState(false);

  return (
    <LoginDataContext.Provider
      value={{
        emailId,
        setEmailId,
      }}
    >
      {children}
    </LoginDataContext.Provider>
  );
}
