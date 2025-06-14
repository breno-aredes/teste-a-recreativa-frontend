"use client";

import React, { createContext, useContext, useState } from "react";
import { Spin } from "antd";

type LoadingContextType = {
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {loading && <Spin size="large" tip="Carregando..." fullscreen />}
      {children}
    </LoadingContext.Provider>
  );
};
