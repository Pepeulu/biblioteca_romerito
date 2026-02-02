import ViewLivroComponent from "./../../../components/ViewLivroComponent";
import "../livros.css";

type Params = Promise<{ id: string }>;

export default async function ViewLivro({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <div className="conteudo">
      <ViewLivroComponent livroId={parseInt(id)}>
        <p><a href="/livros">← Voltar para lista</a></p>
      </ViewLivroComponent>
    </div>
  );
}
