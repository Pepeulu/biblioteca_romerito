'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"
import Button from "./Button"

type ViewLivroComponentProps = {
  livroId: number
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

export default function ViewLivroComponent({ livroId, children }: ViewLivroComponentProps) {
  const [livro, setLivro] = useState<Livro | null>(null)
  const [error, setError] = useState<string | null>(null)

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

  if (error) return <div className="w-full max-w-[700px] min-w-[600px] bg-gray-600 rounded-2xl p-8"><p className="text-red-600">{error}</p></div>
  if (!livro) return <div className="w-full max-w-[700px] min-w-[600px] bg-gray-600 rounded-2xl p-8"><p>Carregando...</p></div>

  return (
    <div className="w-full max-w-[700px] min-w-[700px] bg-zinc-800 rounded-2xl p-8 align-items">
      <div className="flex flex-row gap-4 align-items: center">
        {livro.foto_livro && (
          <div className="flex justify-center">
            <img src={livro.foto_livro} alt={livro.nome_livro} className="rounded-lg max-w-full h-auto" />
          </div>
        )}
        
        <div className="flex flex-col gap-20 text-white justify-center items-center flex-grow">
          <h2 className="text-xl font-bold">{livro.nome_livro}</h2>
          
          <p>
            <strong>ISBN:</strong> {livro.ISBN}
          </p>
          
          <p>
            <strong>Ano de Publicação:</strong> {livro.Ano_de_publicacao}
          </p>

          {livro.livro_arquivo && (
            <p>
              <strong>Arquivo:</strong> <a href={livro.livro_arquivo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Abrir PDF</a>
            </p>
          )}

          <div className="flex gap-4 mt-4 w-full">
            <Button href={`/livros/${livro.id_livro}/edit`} fullWidth>
              Editar
            </Button>

            <Button href={`/livros/${livro.id_livro}/delete`} variant="danger" fullWidth>
              Deletar
            </Button>
          </div>

        </div>
      </div>

      {children}
    </div>
  )
}
