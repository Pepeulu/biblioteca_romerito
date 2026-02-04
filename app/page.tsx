import Link from "next/link";
import Button from "@/components/ButtonComponent";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <Button href="/livros">
        Livros
      </Button>
    </div>
  );
} 