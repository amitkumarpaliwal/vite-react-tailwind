import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({children}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <main className="bg-gray-800 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
