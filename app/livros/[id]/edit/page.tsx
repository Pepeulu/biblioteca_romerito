import EditLivroComponent from "./../../../../components/EditLivroComponent";

type Params = Promise<{ id: string }>;

export default async function EditLivro({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-black">
      <h1 className="text-2xl font-bold text-white mb-6">Editar Livro</h1>
      <EditLivroComponent livroId={parseInt(id)}>
        <p className="mt-4"><a href={`/livros/${id}`} className="text-blue-400 hover:underline">← Voltar para detalhes</a></p>
      </EditLivroComponent>
    </div>
  );
}
