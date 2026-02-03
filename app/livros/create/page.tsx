import CreateLivroComponent from "../../../components/CreateLivroComponent";

export default function CreateLivroPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-black">
      <h1 className="text-2xl font-bold text-white mb-6">Novo Livro</h1>
      <CreateLivroComponent>
        <p className="mt-4"><a href="/livros" className="text-blue-400 hover:underline">← Voltar para lista</a></p>
      </CreateLivroComponent>
    </div>
  );
}