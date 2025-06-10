import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="bg-gray-600 px-6 py-4">
      <span className="text-white text-2xl font-bold"><Link to="/">Meal Search</Link></span>
      <NavLink to="/" className={({isActive}) => isActive ? 'text-emerald-500 ml-4' : 'text-white ml-4 hover:text-emerald-500'}>
        Home
      </NavLink>
      <NavLink to="/ingredients" className={({isActive}) => isActive ? 'text-emerald-500 ml-4' : 'text-white ml-4 hover:text-emerald-500'}>
        Ingredients
      </NavLink>
    </nav>
  )
}
