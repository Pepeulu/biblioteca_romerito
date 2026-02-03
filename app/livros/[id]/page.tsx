import ViewLivroComponent from "./../../../components/ViewLivroComponent";

type Params = Promise<{ id: string }>;

export default async function ViewLivro({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex justify-center items-center p-8 bg-black">
      <ViewLivroComponent livroId={parseInt(id)}>
        <p className="mt-4"><a href="/livros" className="text-blue-600 hover:underline">← Voltar para lista</a></p>
      </ViewLivroComponent>
    </div>
  );
}
