"use client"

import React, { createContext, useContext, useState } from 'react';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

interface QrContextType {
  generatedImageUrl: string | null;
  loading: boolean;
  generateQrCode: (url: string) => Promise<void>;
  clearQrCode: () => void;
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
  const [loading, setLoading] = useState(false);

  const generateQrCode = async (url: string) => {
    setLoading(true);
    try {
      const response = await api.post("/QrGenerator", { url }, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      setGeneratedImageUrl(imageUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const clearQrCode = () => {
    if (generatedImageUrl) {
      URL.revokeObjectURL(generatedImageUrl);
    }
    setGeneratedImageUrl(null);
  };

  return (
    <QrContext.Provider value={{ 
      generatedImageUrl, 
      loading, 
      generateQrCode,
      clearQrCode
    }}>
      {children}
    </QrContext.Provider>
  );
};
