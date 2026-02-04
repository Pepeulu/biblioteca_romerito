'use client'

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import BookCard from "../../components/BookCardComponent";
import Button from "../../components/ButtonComponent";
import LivroFilter from "../../components/LivroFilterComponent";
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

function LivrosPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [livros, setLivros] = useState<Livro[]>([]);
  
  // Filtros - inicializados a partir da URL
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [ordenar, setOrdenar] = useState(searchParams.get('ordering') || "");
  const [anoMin, setAnoMin] = useState(searchParams.get('ano_min') || "");
  const [anoMax, setAnoMax] = useState(searchParams.get('ano_max') || "");
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Atualiza a URL
  const updateURL = useCallback((params: { [key: string]: string }) => {
    const urlParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      }
    });
    
    const queryString = urlParams.toString();
    router.push(`/livros${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [router]);

  const fetchLivros = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      
      if (searchQuery) params.append('search', searchQuery);
      if (ordenar) params.append('ordering', ordenar);
      if (anoMin) params.append('ano_min', anoMin);
      if (anoMax) params.append('ano_max', anoMax);
      params.append('page', currentPage.toString());
      
      // Atualiza a URL
      updateURL({
        search: searchQuery,
        ordering: ordenar,
        ano_min: anoMin,
        ano_max: anoMax,
        page: currentPage.toString(),
      });
      
      const response = await axios.get<PaginatedResponse>(`${API_BASE_URL}/livros/?${params.toString()}`);
      
      setLivros(response.data.results);
      setTotalCount(response.data.count);
      setTotalPages(Math.ceil(response.data.count / 12));
    } catch (err) {
      console.log("Erro ao buscar livros:", err);
    }
  }, [searchQuery, ordenar, anoMin, anoMax, currentPage, updateURL]);

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

  return (
    <div className="p-8">
      <LivroFilter
        filters={{ searchQuery, ordenar, anoMin, anoMax }}
        onSearchChange={handleSearch}
        onOrdenarChange={handleOrdenar}
        onAnoMinChange={handleAnoMinChange}
        onAnoMaxChange={handleAnoMaxChange}
        onLimparFiltros={limparFiltros}
      />
      <div className="ml-auto flex flex-shrink-0 mb-6 max-w-7xl mx-auto w-full justify-center">
        <Button href="/livros/create">
          Novo Livro
        </Button>
      </div>

      {livros.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <p className="text-white text-xl">Nenhum livro encontrado</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-5 gap-x-10 justify-center items-center">
          {livros.map((livro) => (
            <Link key={livro.id_livro} href={`/livros/${livro.id_livro}`}>
              <BookCard
                titulo={livro.nome_livro}
                imagem={livro.foto_livro || "/placeholder_book.png"}
              />
            </Link>
          ))}
        </div>
      )}

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

export default function LivrosPage() {
  return (
    <Suspense fallback={null}>
      <LivrosPageContent />
    </Suspense>
  );
}
