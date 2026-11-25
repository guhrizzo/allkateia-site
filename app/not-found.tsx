import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="wrap not-found-inner">
        <a href="/" className="brand">
          <Image src="/logo-blue.png" alt="Allkateia" width={222} height={117} className="brand-logo" />
        </a>
        <p className="not-found-code">Erro 404</p>
        <h1>Página não encontrada.</h1>
        <p className="not-found-copy">O endereço pode ter mudado. Volte ao início para continuar navegando.</p>
        <a className="button button-main" href="/">
          <ArrowLeft size={19} aria-hidden="true" /> Voltar ao início
        </a>
      </div>
    </main>
  );
}