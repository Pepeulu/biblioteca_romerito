import DeleteLivroComponent from "./../../../../components/DeleteLivroComponent";
import "../../livros.css";

type Params = Promise<{ id: string }>;

export default async function DeleteLivro({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <div className="conteudo">
      <h1>Deletar Livro</h1>
      <DeleteLivroComponent livroId={parseInt(id)}>
        <p><a href={`/livros/${id}`}>← Voltar para detalhes</a></p>
      </DeleteLivroComponent>
    </div>
  );
}
