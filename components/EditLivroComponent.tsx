'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"
import Button from "./Button"

type EditLivroComponentProps = {
  livroId: number
  onSuccess?: () => void
  children?: React.ReactNode
}

type Livro = {
  id_livro: number
  nome_livro: string
  Ano_de_publicacao: string
  ISBN: string
  foto_livro: string | null
  livro_arquivo: string | null
}

export default function EditLivroComponent({ livroId, onSuccess, children }: EditLivroComponentProps) {
  const [livro, setLivro] = useState<Livro | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function fetchLivro() {
      try {
        const response = await axios.get(`${API_BASE_URL}/livros/${livroId}/`)
        setLivro(response.data)
      } catch (err) {
        setError("ID inválido ou livro não encontrado")
        console.error("Erro ao buscar livro:", err)
      }
    }

    fetchLivro()
  }, [livroId])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await axios.put(
        `${API_BASE_URL}/livros/${livroId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log("Livro atualizado:", response.data)
      setSuccess(true)
      setLivro(response.data)
      
      if (onSuccess) {
        onSuccess()
      }

    } catch (err) {
      setError("Erro ao atualizar livro")
      console.error("Erro ao atualizar livro:", err)
    }
  }

  if (error) return <div className="w-full max-w-[420px] bg-gray-300 rounded-2xl p-8"><p className="text-red-600">{error}</p></div>
  if (!livro) return <div className="w-full max-w-[420px] bg-gray-300 rounded-2xl p-8"><p>Carregando...</p></div>

  return (
    <div className="w-full max-w-[420px] bg-zinc-800 rounded-2xl">
      {error && <p className="text-red-600 px-8 pt-4">{error}</p>}
      {success && <p className="text-green-600 px-8 pt-4">Livro atualizado com sucesso!</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-gray-900 flex flex-col gap-3 p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">

        <input 
          type="text" 
          name="nome_livro" 
          placeholder="Nome do livro"
          defaultValue={livro.nome_livro}
          required 
          className="px-4 py-3 rounded-lg border border-gray-300 text-base transition-all duration-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/15"
        />

        <input 
          type="date" 
          name="Ano_de_publicacao"
          defaultValue={livro.Ano_de_publicacao}
          required 
          className="px-4 py-3 rounded-lg border border-gray-300 text-base transition-all duration-200 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/15"
        />

        <input 
          type="text" 
          name="ISBN"
          placeholder="ISBN"
          defaultValue={livro.ISBN}
          required 
          className="px-4 py-3 rounded-lg border border-gray-300 text-base transition-all duration-200 bg-white placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/15"
        />

        <label className="flex flex-col gap-1 text-sm text-black">
          Foto do livro (deixe em branco para manter a atual)
          <input type="file" name="foto_livro" accept="image/*" className="p-2 text-sm rounded-lg border border-gray-300 bg-white" />
        </label>

        <label className="flex flex-col gap-1 text-sm text-black">
          Arquivo do livro (deixe em branco para manter o atual)
          <input type="file" name="livro_arquivo" accept=".pdf" className="p-2 text-sm rounded-lg border border-gray-300 bg-white  " />
        </label>

        <Button type="submit" fullWidth className="mt-4">
          Atualizar
        </Button>

        {children}
      </form>
    </div>
  )
}
