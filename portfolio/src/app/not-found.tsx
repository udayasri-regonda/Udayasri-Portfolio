import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative text-center">
        <p className="font-mono text-sm text-accent2">ERROR 404</p>
        <h1 className="mt-4 font-display text-6xl font-bold sm:text-7xl">
          <span className="gradient-text">Page not found</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          The page you are looking for does not exist or has moved. The portfolio home page has everything you may need.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft size={16} aria-hidden /> Back to portfolio
        </Link>
      </div>
    </main>
  );
}
