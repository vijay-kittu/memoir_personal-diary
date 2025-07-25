import { useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Homepage from './components/Homepage.jsx'
import Signin from './components/Signin.jsx'
import Signup from './components/Signup.jsx'
import Profile from './components/Profile.jsx'
import NotFound from './components/NotFound.jsx'
import { JournalContext, JournalProvider } from './context/JournalContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRoutes from './components/AppRoutes.jsx'

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
    <JournalProvider>
      {/*<div>
        <Routes>
          <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={!authUser ? <Signin /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>*/}
        <AppRoutes />
      </JournalProvider>
      </AuthProvider>
  )
}

export default App
