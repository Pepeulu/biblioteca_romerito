'use client'

import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { API_BASE_URL } from "@/config/api"
import Button from "./ButtonComponent"

type DeleteLivroComponentProps = {
  livroId: number
  livroNome?: string
  onCancel?: () => void
  children?: React.ReactNode
}

export default function DeleteLivroComponent({ 
  livroId, 
  livroNome = "Livro",
  onCancel,
  children 
}: DeleteLivroComponentProps) {
  const router = useRouter()
  const [confirmDelete, setConfirmDelete] = useState(true)

  async function handleDelete() {
    try {
      await axios.delete(`${API_BASE_URL}/livros/${livroId}/`)

      console.log("Livro deletado com sucesso")
      router.push('/livros')

    } catch (err) {
      console.log("Erro ao deletar livro:", err)
    }
  }

  if (confirmDelete) {
    return (
      <div className="w-full max-w-[420px] bg-gray-300 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col gap-4 text-gray-900">
          <p>Tem certeza que deseja deletar <strong>"{livroNome}"</strong>?</p>
          <p className="text-gray-600 text-sm">Esta ação não pode ser desfeita.</p>

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
