import EditLivroComponent from "./../../../../components/EditLivroComponent";
import "../../livros.css";

type Params = Promise<{ id: string }>;

export default async function EditLivro({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <div className="conteudo">
      <h1>Editar Livro</h1>
      <EditLivroComponent livroId={parseInt(id)}>
        <p><a href={`/livros/${id}`}>← Voltar para detalhes</a></p>
      </EditLivroComponent>
    </div>
  );
}
