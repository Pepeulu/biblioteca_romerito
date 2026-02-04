'use client'

import React from "react"
import Image from "next/image"
import CardContainer from "./CardContainerComponent"
type BookCardProps = {
  titulo: string
  imagem: string
}

export default function BookCard({ titulo, imagem }: BookCardProps) {
  return (
    <CardContainer className="w-90 h-140 flex flex-col">
      <div className="w-full flex items-center justify-center flex-shrink-0 flex-grow-0 h-120 mb-4">
        <img 
          src={imagem}
          alt={titulo}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="w-full flex-1 flex items-center justify-center px-2 overflow-hidden">
        <p className="text-xl font-bold text-white text-center line-clamp-2 break-words">{titulo}</p>
      </div>
    </CardContainer>
  )
}
