import { useState } from 'react';
import { api, createAuthenticatedApi } from '@/lib/axios';
import { toast } from 'sonner';

export const useQrGenerator = (token: string | undefined) => {
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

  const saveQrCode = async (title: string, imageUrl: string) => {
    console.log('Token received:', token); // Debug token

    if (!token) {
      toast.error('Please sign in to save QR codes');
      return false;
    }

    if (!title.trim()) {
      toast.error('Please enter a title');
      return false;
    }

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const base64Url = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const api = createAuthenticatedApi(token);
      console.log('Making request with headers:', api.defaults.headers); // Debug headers

      const response2 = await api.post('/QrCodes', {
        title: title.trim(),
        url: base64Url
      });
      
      console.log('Save response:', response2); // Debug response

      toast.success("QR code saved successfully");
      return true;
    } catch (error: any) {
      console.error('Failed to save QR code:', error.response || error); // Enhanced error logging
      toast.error("Failed to save QR code");
      return false;
    }
  };

  return {
    loading,
    generateQrCode,
    saveQrCode
  };
};
