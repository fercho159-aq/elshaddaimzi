"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { useMounted } from "@/components/admin/useMounted";
import { useDemoDB } from "@/lib/demo/store";

function Editor() {
  const { id } = useParams<{ id: string }>();
  const created = useSearchParams().get("creado") === "1";
  const db = useDemoDB();
  const mounted = useMounted();
  if (!mounted) return null;
  const product = db.products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center">
        <p className="text-lg font-bold">No encontramos ese producto.</p>
        <p className="mt-1 text-sm text-ink/60">Es posible que se haya eliminado.</p>
        <Link href="/admin/productos" className="mt-5 inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-bold text-cream">
          Volver a productos
        </Link>
      </div>
    );
  }
  return <ProductForm key={product.id} initial={product} justCreated={created} />;
}

export default function EditProductPage() {
  return (
    <Suspense>
      <Editor />
    </Suspense>
  );
}
