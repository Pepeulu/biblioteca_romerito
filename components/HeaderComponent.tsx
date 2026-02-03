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
    
    <header className="h-20 w-full flex flex-row items-center p-4 bg-zinc-800 text-white shrink-0">
      {logoUrl && <img src={logoUrl} alt="Logo" className="w-[100px] h-auto" />}
      <h1 className="m-0 text-2xl self-end">{titulo}</h1>
      <SearchComponent
        query={query}
        onSearch={setQuery}
      />
    </header>
  )
}