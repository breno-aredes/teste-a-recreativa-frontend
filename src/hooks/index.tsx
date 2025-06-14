"use client";

import React from "react";
import { LoadingProvider } from "@/hooks/useLoading";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoadingProvider>{children}</LoadingProvider>;
}
