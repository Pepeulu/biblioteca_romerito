'use client'

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import BookCard from "../../components/BookCard";
import Button from "../../components/Button";
import LivroFilter from "../../components/LivroFilter";
import { API_BASE_URL } from "@/config/api";

type Livro = {
  id_livro: number;
  nome_livro: string;
  Ano_de_publicacao: string;
  ISBN: string;
  foto_livro: string | null;
  livro_arquivo: string | null;
};

type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Livro[];
};

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [ordenar, setOrdenar] = useState("");
  const [anoMin, setAnoMin] = useState("");
  const [anoMax, setAnoMax] = useState("");
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLivros = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (searchQuery) params.append('search', searchQuery);
      if (ordenar) params.append('ordering', ordenar);
      if (anoMin) params.append('ano_min', anoMin);
      if (anoMax) params.append('ano_max', anoMax);
      params.append('page', currentPage.toString());
      
      const response = await axios.get<PaginatedResponse>(`${API_BASE_URL}/livros/?${params.toString()}`);
      
      setLivros(response.data.results);
      setTotalCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (err) {
      setError("Erro ao carregar livros");
      console.error("Erro ao buscar livros:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, ordenar, anoMin, anoMax, currentPage]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchLivros();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchLivros]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleOrdenar = (value: string) => {
    setOrdenar(value);
    setCurrentPage(1);
  };

  const handleAnoMinChange = (value: string) => {
    setAnoMin(value);
    setCurrentPage(1);
  };

  const handleAnoMaxChange = (value: string) => {
    setAnoMax(value);
    setCurrentPage(1);
  };

  const limparFiltros = () => {
    setSearchQuery("");
    setOrdenar("");
    setAnoMin("");
    setAnoMax("");
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Filtros */}
      <LivroFilter
        filters={{ searchQuery, ordenar, anoMin, anoMax }}
        totalCount={totalCount}
        onSearchChange={handleSearch}
        onOrdenarChange={handleOrdenar}
        onAnoMinChange={handleAnoMinChange}
        onAnoMaxChange={handleAnoMaxChange}
        onLimparFiltros={limparFiltros}
      />
      <div className="ml-auto">
            <Button href="/livros/create">
              + Novo Livro
            </Button>
          </div>

      {/* Lista de livros */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <p className="text-white text-xl">Carregando livros...</p>
        </div>
      ) : livros.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <p className="text-white text-xl">Nenhum livro encontrado</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-5 gap-x-10 justify-center items-center">
          {livros.map((livro) => (
            <Link key={livro.id_livro} href={`/livros/${livro.id_livro}`}>
              <BookCard
                titulo={livro.nome_livro}
                imagem={livro.foto_livro || "/imagens_teste/aku.jpg"}
              />
            </Link>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                    currentPage === pageNum
                      ? 'bg-white text-black'
                      : 'bg-gray-600 text-white hover:bg-gray-500'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Próximo →
          </Button>
        </div>
      )}
    </div>
  );
}