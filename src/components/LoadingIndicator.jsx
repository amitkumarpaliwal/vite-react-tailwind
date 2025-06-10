import React from 'react'

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-emerald-500"></div>
      <span className="ml-4 text-emerald-500 font-semibold text-lg">Loading...</span>
    </div>
  )
}
