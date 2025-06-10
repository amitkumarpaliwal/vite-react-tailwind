import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-600 px-6 py-4 text-center">
      <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Meal Search. All rights reserved.</span>
    </footer>
  )
}
