import { useState } from 'react';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

export const useQrGenerator = () => {
  const [loading, setLoading] = useState(false);

  const generateQrCode = async (url: string) => {
    setLoading(true);
    try {
      const response = await api.post("/QrGenerator", { url }, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      toast.error('Failed to generate QR code');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    generateQrCode
  };
};
