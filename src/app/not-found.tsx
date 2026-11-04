import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site grid min-h-[70vh] place-items-center pt-24 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-sun">404</p>
        <h1 className="mt-3 text-3xl">Бет табылмады</h1>
        <p className="mt-2 text-ink-soft" lang="ru">Страница не найдена</p>
        <Link href="/" className="btn btn-primary mt-6">
          Басты бет · Главная
        </Link>
      </div>
    </section>
  );
}
