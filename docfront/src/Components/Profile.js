import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'
import './Profile.css';

export default function Profile() {
    const auth=useAuth()
    const navigate=useNavigate()
    const handleLogout=()=>
    {
        auth.logout()
        navigate('/login')}
    
  return (
    <center><div className='profile'><center>Profile Page
      
    </center>
    <h2>Welcome User {auth.user}</h2>
       
        
        <button onClick={handleLogout}>logout</button></div></center>
  )
}