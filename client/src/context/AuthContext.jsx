import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(false);

  const handleAuth = () => {
    setAuthUser(true);
  }

  return (
      <AuthContext.Provider value={{authUser, handleAuth}}>
        {children}
      </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}