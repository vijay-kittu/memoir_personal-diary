import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  
  const [user, setUser] = useState(null); 

  

  const handleUser = (user) => {
    setUser(user);
  }

  const logout = () => {
    
    setUser(null);
  }

  return (
      <AuthContext.Provider value={{ user, handleUser}}>
        {children}
      </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}