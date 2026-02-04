'use client'

import React from "react"

type CardContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div className={`p-4 bg-zinc-800 rounded-2xl flex flex-col flex-wrap items-center hover:bg-zinc-700 transition-colors duration-300 ${className ?? ""}`}>
      {children}
    </div>
  )
}
