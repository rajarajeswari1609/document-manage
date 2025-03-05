import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './Auth'
import './Navbar.css'

export default function Navbar() {

    const auth=useAuth()
    return (
      <nav class='primary-nav'>
        <NavLink to='/'>Home</NavLink>
        {!auth.user && <NavLink to='/login'>Login</NavLink>}
        {!auth.user && <NavLink to='/signup'>Signup</NavLink>}
          <NavLink to='/AboutUs'>AboutUs</NavLink>
           <NavLink to="/profile" className="text-white hover:underline">
              Profile
            </NavLink>
         
        <NavLink to='/contact'>Contact</NavLink>
        <NavLink to='/dashboard'>Dashboard</NavLink>
        
      
        </nav>
      
  )
  }
