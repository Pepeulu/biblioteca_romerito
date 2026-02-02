'use client'

import React, { useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config/api"

type DeleteLivroComponentProps = {
  livroId: number
  livroNome?: string
  onSuccess?: () => void
  onCancel?: () => void
  children?: React.ReactNode
}

export default function DeleteLivroComponent({ 
  livroId, 
  livroNome = "Livro",
  onSuccess, 
  onCancel,
  children 
}: DeleteLivroComponentProps) {
  const [error, setError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  async function handleDelete() {
    setError(null)

    try {
      await axios.delete(`${API_BASE_URL}/livros/${livroId}/`)

      console.log("Livro deletado com sucesso")

      if (onSuccess) {
        onSuccess()
      }

    } catch (err) {
      setError("ID inválido ou livro não encontrado")
      console.error("Erro ao deletar livro:", err)
    }
  }

  if (confirmDelete) {
    return (
      <div className="form-container delete-confirmation">
        <div className="confirmation-box">
          <p>Tem certeza que deseja deletar <strong>"{livroNome}"</strong>?</p>
          <p style={{ color: "#666", fontSize: "0.9em" }}>Esta ação não pode ser desfeita.</p>
          
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="button-group">
            <button 
              onClick={handleDelete}
              style={{ backgroundColor: "#dc3545" }}
            >
              Sim, deletar
            </button>
            
            <button 
              onClick={() => {
                setConfirmDelete(false)
                if (onCancel) onCancel()
              }}
              style={{ backgroundColor: "#6c757d" }}
            >
              Cancelar
            </button>
          </div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="form-container">
      <button 
        onClick={() => setConfirmDelete(true)}
        style={{ backgroundColor: "#dc3545" }}
      >
        Deletar Livro
      </button>
      {children}
    </div>
  )
}
