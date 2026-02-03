'use client'

import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/config/api"
import Button from "./Button"

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
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(true)
  const [success, setSuccess] = useState(false)

  async function handleDelete() {
    setError(null)

    try {
      await axios.delete(`${API_BASE_URL}/livros/${livroId}/`)

      console.log("Livro deletado com sucesso")
      setSuccess(true)

      if (onSuccess) {
        onSuccess()
      }

      setTimeout(() => {
        router.push('/livros')
      }, 1500)

    } catch (err) {
      setError("ID inválido ou livro não encontrado")
      console.error("Erro ao deletar livro:", err)
    }
  }

  if (confirmDelete) {
    return (
      <div className="w-full max-w-[420px] bg-gray-300 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col gap-4 text-gray-900">
          <p>Tem certeza que deseja deletar <strong>"{livroNome}"</strong>?</p>
          <p className="text-gray-600 text-sm">Esta ação não pode ser desfeita.</p>
          
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">Livro deletado com sucesso! Redirecionando...</p>}

          <div className="flex gap-4 mt-4">
            <Button 
              onClick={handleDelete}
              variant="danger"
              fullWidth
            >
              Sim, deletar
            </Button>
            
            <Button 
              onClick={() => {
                setConfirmDelete(false)
                if (onCancel) onCancel()
              }}
              fullWidth
            >
              Cancelar
            </Button>
          </div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="w-full max-w-[420px] bg-gray-300 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      <Button 
        onClick={() => setConfirmDelete(true)}
        variant="danger"
        fullWidth
      >
        Deletar Livro
      </Button>
      {children}
    </div>
  )
}
