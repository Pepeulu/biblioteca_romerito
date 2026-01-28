'use client'

type SearchComponentProps = {
  query: string
  onSearch: (newQuery: string) => void
}

export default function SearchComponent({ query, onSearch }: SearchComponentProps) {
  return (
    <div className="search-component">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Buscar livros..."
        className="query-input"
      /> 
    </div>
  )
}