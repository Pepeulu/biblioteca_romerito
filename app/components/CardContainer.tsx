'use client'

import React from "react"

type CardContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div className={`card ${className ?? ""}`}>
      {children}
    </div>
  )
}
