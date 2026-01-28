'use client'

import React from "react"

type CreateLivroComponentProps = {
  children: React.ReactNode
}

export default function CreateLivroComponent({ children, }: CreateLivroComponentProps) {
  return (
    <div className='form-container'>
        <form method="post">
            <input type="text" />
        </form>
      {children}
    </div>
  )
}