'use client'

import React from "react"
import Image from "next/image"
import CardContainer from "./CardContainer"
type BookCardProps = {
  titulo: string
  imagem: string
}

export default function BookCard({ titulo, imagem }: BookCardProps) {
  return (
    <CardContainer>
      <div className="flex-auto">
        <img 
          src={imagem}
          alt={titulo}
          sizes="(max-width: 600px) 100vw, 200px"
          className="flex-auto"
        />
      </div>
      <div>
        <p className="" > {titulo} </p>
      </div>
    </CardContainer>
  )
}
