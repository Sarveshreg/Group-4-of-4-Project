import React from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import { clearToken } from '../features/auth/authSlice';


function Navbar() {
  let token=useSelector((state)=>state.auth.token);
  let dispatch = useDispatch()
  return (
    <span className="header">
      <NavLink  className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : "not-active"
        } to="/"> Home</NavLink>
      {token && <span className='flex gap-6'>
      <NavLink className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : "not-active"
        } to="/profile"> Profile</NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : "not-active"
        } to="/createevent"> Create-Event</NavLink>
      <button onClick={(e)=>dispatch(clearToken())}>Logout</button>
      </span>
      }
      {!token && <span className='flex gap-6'>
      <NavLink className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : "not-active"
        } to="/login"> Login</NavLink>
      <NavLink className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : "not-active"
        } to="/register"> Register</NavLink>
      </span>
      }
    </span>
  )
}

export default Navbar