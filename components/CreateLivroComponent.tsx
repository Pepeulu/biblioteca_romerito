'use client'

import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/config/api"
import Button from "./ButtonComponent"

type CreateLivroComponentProps = {
  children?: React.ReactNode
}

export default function CreateLivroComponent({ children }: CreateLivroComponentProps) {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      const response = await axios.post(
        `${API_BASE_URL}/livros/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log("Livro criado:", response.data)
      router.push('/livros')

    } catch (err) {
      console.log("Erro ao criar livro:", err)
    }
  }

  return (
    <div className="w-full max-w-[420px] bg-zinc-800 rounded-2xl">

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-black flex flex-col gap-3 p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">

        <input type="text" name="nome_livro" placeholder="Nome do livro" required className="px-4 py-3 rounded-lg border border-gray-300 text-base transition-all duration-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/15" />

        <input type="date" name="Ano_de_publicacao" required className="px-4 py-3 rounded-lg border border-gray-300 text-base transition-all duration-200 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/15" />

        <input type="text" name="ISBN" required placeholder="ISBN" className="px-4 py-3 rounded-lg border border-gray-300 text-base transition-all duration-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/15" />

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Foto do livro
          <input type="file" name="foto_livro" accept="image/*" className="p-2 text-sm rounded-lg border border-gray-300 bg-white" />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Arquivo PDF
          <input type="file" name="livro_arquivo" accept=".pdf" className="p-2 text-sm rounded-lg border border-gray-300 bg-white" />
        </label>

        <Button type="submit" fullWidth className="mt-4">
          Salvar
        </Button>

        {children}
      </form>
    </div>
  )
}
