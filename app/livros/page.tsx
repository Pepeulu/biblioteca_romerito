import Image from "next/image";
import "./livros.css";
import BookCard from "../components/BookCard";

export default function Home() {
  return (
    <div className="conteudo">
      <BookCard titulo="Aku no Hana" imagem="/imagens_teste/aku.jpg" />
      <BookCard titulo="Aku no Hana" imagem="/imagens_teste/aku.jpg" />
      <BookCard titulo="Aku no Hana" imagem="/imagens_teste/aku.jpg" />
      <BookCard titulo="Aku no Hana" imagem="/imagens_teste/aku.jpg" />
    </div>
  );
}