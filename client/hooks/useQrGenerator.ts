import { useState } from 'react';
import { api, authenticatedApi } from '@/lib/axios';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export const useQrGenerator = () => {
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

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
    if (status !== 'authenticated') {
      toast.error('Please sign in to save QR codes');
      return false;
    }

    if (!title.trim()) {
      toast.error('Please enter a title');
      return false;
    }

    try {
      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();
      const base64Url = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      await authenticatedApi.post('/QrCodes', {
        title: title.trim(),
        url: base64Url
      });

      toast.success("QR code saved successfully");
      return true;
    } catch (error) {
      console.error('Failed to save QR code:', error);
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
