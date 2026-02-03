'use client'

import Button from "./Button"

type FilterValues = {
  searchQuery: string
  ordenar: string
  anoMin: string
  anoMax: string
}

type LivroFilterProps = {
  filters: FilterValues
  totalCount: number
  onSearchChange: (value: string) => void
  onOrdenarChange: (value: string) => void
  onAnoMinChange: (value: string) => void
  onAnoMaxChange: (value: string) => void
  onLimparFiltros: () => void
}

export default function LivroFilter({
  filters,
  totalCount,
  onSearchChange,
  onOrdenarChange,
  onAnoMinChange,
  onAnoMaxChange,
  onLimparFiltros,
}: LivroFilterProps) {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Buscar</label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nome ou ISBN..."
            className="px-4 h-11 rounded-lg border border-gray-600 bg-gray-700 text-white w-64 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Ordenar por</label>
          <select
            value={filters.ordenar}
            onChange={(e) => onOrdenarChange(e.target.value)}
            className="px-4 h-11 rounded-lg border border-gray-600 bg-gray-700 text-white w-64 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="">Padrão</option>
            <option value="nome_livro">Nome (A-Z)</option>
            <option value="-nome_livro">Nome (Z-A)</option>
            <option value="Ano_de_publicacao">Ano (Antigo primeiro)</option>
            <option value="-Ano_de_publicacao">Ano (Recente primeiro)</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Ano mínimo</label>
          <input
            type="number"
            value={filters.anoMin}
            onChange={(e) => onAnoMinChange(e.target.value)}
            placeholder="Ex: 2000"
            className="px-4 h-11 rounded-lg border border-gray-600 bg-gray-700 text-white w-32 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Ano máximo</label>
          <input
            type="number"
            value={filters.anoMax}
            onChange={(e) => onAnoMaxChange(e.target.value)}
            placeholder="Ex: 2026"
            className="px-4 h-11 rounded-lg border border-gray-600 bg-gray-700 text-white w-32 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <Button onClick={onLimparFiltros} className="h-11 w-64">
          Limpar Filtros
        </Button>
      </div>
      
      <div className="mt-4 text-gray-400 text-sm">
        {totalCount} livro(s) encontrado(s)
      </div>
    </div>
  )
}
