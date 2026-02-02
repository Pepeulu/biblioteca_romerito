'use client'

import React from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"

type CreateLivroComponentProps = {
  children?: React.ReactNode
}

export default function CreateLivroComponent({ children }: CreateLivroComponentProps) {

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

    } catch (error) {
      console.error("Erro ao criar livro:", error)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input type="text" name="nome_livro" placeholder="Nome do livro" required />

        <input type="date" name="Ano_de_publicacao" required />

        <input type="text" name="ISBN" required placeholder="ISBN"/>

        <input type="file" name="foto_livro" accept="image/*" />

        <input type="number" name="autor" value={1} readOnly />

        <input type="file" name="livro_arquivo" accept=".pdf" />

        <button type="submit">Salvar</button>

        {children}
      </form>
    </div>
  )
}
