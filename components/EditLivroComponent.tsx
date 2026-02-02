'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"

type EditLivroComponentProps = {
  livroId: number
  onSuccess?: () => void
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

  if (error) return <div className="form-container"><p style={{ color: "red" }}>{error}</p></div>
  if (!livro) return <div className="form-container"><p>Carregando...</p></div>

  return (
    <div className="form-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Livro atualizado com sucesso!</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input 
          type="text" 
          name="nome_livro" 
          placeholder="Nome do livro"
          defaultValue={livro.nome_livro}
          required 
        />

        <input 
          type="date" 
          name="Ano_de_publicacao"
          defaultValue={livro.Ano_de_publicacao}
          required 
        />

        <input 
          type="text" 
          name="ISBN"
          placeholder="ISBN"
          defaultValue={livro.ISBN}
          required 
        />

        <label>
          Foto do livro (deixe em branco para manter a atual)
          <input type="file" name="foto_livro" accept="image/*" />
        </label>

        <input type="number" name="autor" value={livro.autor} readOnly />

        <label>
          Arquivo do livro (deixe em branco para manter o atual)
          <input type="file" name="livro_arquivo" accept=".pdf" />
        </label>

        <button type="submit">Atualizar</button>

        {children}
      </form>
    </div>
  )
}
