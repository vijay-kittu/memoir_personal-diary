import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

import Homepage from './Homepage.jsx'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import Profile from './Profile.jsx'
import NotFound from './NotFound.jsx'

const AppRoutes = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={!authUser ? <Signin /> : <Navigate to="/" />} />
      <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/signin" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
