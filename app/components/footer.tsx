import dayjs from "dayjs";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            © {dayjs().year()} Yuri Silveira. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2 opacity-80">
            Desenvolvido com ❤️ usando Next.js e Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
