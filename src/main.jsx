import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  AddUserForm  from './addUserForm.jsx'
import SignIn from './signInForm.jsx'
import './index.css'
import LoginComponent from './loginScreen.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddUserForm />
    <SignIn />
    <LoginComponent />
  </StrictMode>,
)
