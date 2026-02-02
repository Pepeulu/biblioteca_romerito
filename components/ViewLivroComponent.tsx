'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"

type ViewLivroComponentProps = {
  livroId: number
  children?: React.ReactNode
}

type Livro = {
  id: number
  nome_livro: string
  Ano_de_publicacao: string
  ISBN: string
  foto_livro: string
  livro_arquivo: string
  autor: number
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

  if (error) return <div className="form-container"><p style={{ color: "red" }}>{error}</p></div>
  if (!livro) return <div className="form-container"><p>Carregando...</p></div>

  return (
    <div className="form-container">
      <div className="livro-detalhes">
        {livro.foto_livro && (
          <div className="livro-imagem">
            <img src={livro.foto_livro} alt={livro.nome_livro} />
          </div>
        )}
        
        <div className="livro-info">
          <h2>{livro.nome_livro}</h2>
          
          <p>
            <strong>ISBN:</strong> {livro.ISBN}
          </p>
          
          <p>
            <strong>Ano de Publicação:</strong> {livro.Ano_de_publicacao}
          </p>
          
          <p>
            <strong>ID do Autor:</strong> {livro.autor}
          </p>

          {livro.livro_arquivo && (
            <p>
              <strong>Arquivo:</strong> <a href={livro.livro_arquivo} target="_blank" rel="noopener noreferrer">Abrir PDF</a>
            </p>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}
