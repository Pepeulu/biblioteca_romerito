'use client'

import React, { useState } from "react"
import SearchComponent from "./SearchComponent"

type HeaderProps = {
  children?: React.ReactNode
  titulo?: string
  logoUrl?: string
}


export default function HeaderComponent({children, titulo, logoUrl}: HeaderProps) {
  const [query, setQuery] = useState("")
  return (
    
    <header className="header">
      {logoUrl && <img src={logoUrl} alt="Logo" className="header-logo" />}
      <h1>{titulo}</h1>
      <SearchComponent
        query={query}
        onSearch={setQuery}
      />
    </header>
  )
}