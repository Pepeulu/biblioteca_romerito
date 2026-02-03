'use client'

type SearchComponentProps = {
  query: string
  onSearch: (newQuery: string) => void
}

export default function SearchComponent({ query, onSearch }: SearchComponentProps) {
  return (
    <div className="self-center justify-self-center ml-auto mr-4 flex flex-row items-center gap-2 border border-black rounded-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Buscar livros..."
        className="px-2 py-1 rounded-lg transition-all duration-200 focus:outline-white placeholder:pl-2"
      /> 
    </div>
  )
}