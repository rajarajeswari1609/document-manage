import React from 'react'
import { useAuth } from './Auth'
import { Navigate } from 'react-router-dom'
export default function ReqAuth(props) {
    const auth=useAuth()
  
    if(!auth.user){
        return<Navigate to='/login'/>
    }
    return (
    
    props.children
    )
 
  
}