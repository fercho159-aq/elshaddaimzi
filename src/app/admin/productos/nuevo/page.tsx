"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { useMounted } from "@/components/admin/useMounted";

export default function NewProductPage() {
  const mounted = useMounted();
  return mounted ? <ProductForm /> : null;
}
