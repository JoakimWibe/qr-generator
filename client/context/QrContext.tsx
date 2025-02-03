"use client"

import React, { createContext, useContext, useState } from 'react';

interface QrContextType {
  generatedImageUrl: string | null
  setGeneratedImageUrl: (generatedImageUrl: string | null) => void;
}

const QrContext = createContext<QrContextType | undefined>(undefined);

export const useQrContext = (): QrContextType => {
  const context = useContext(QrContext);
  if (!context) {
    throw new Error('useQrContext must be used within a QrProvider');
  }
  return context;
};

interface QrProviderProps {
  children: React.ReactNode;
}

export const QrProvider: React.FC<QrProviderProps> = ({ children }) => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  return (
    <QrContext.Provider value={{ generatedImageUrl, setGeneratedImageUrl }}>
      {children}
    </QrContext.Provider>
  );
};
