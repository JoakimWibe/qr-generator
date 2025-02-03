import { useState, useEffect } from 'react';
import { createAuthenticatedApi } from '@/lib/axios';
import { toast } from "sonner";

interface QrCode {
  id: string;
  title: string;
  url: string;
}

export const useQrCodes = (token: string | undefined) => {
  const [qrCodes, setQrCodes] = useState<QrCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQrCodes = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const api = createAuthenticatedApi(token);
        const response = await api.get('/QrCodes');
        setQrCodes(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load QR codes');
        console.error("Failed to load QR codes", err)
      } finally {
        setLoading(false);
      }
    };

    fetchQrCodes();
  }, [token]);

  const handleDelete = async (id: string, title: string) => {
    if (!token) return;

    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) return;

    try {
      const api = createAuthenticatedApi(token);
      await api.delete(`/QrCodes/${id}`);
      setQrCodes(qrCodes.filter(code => code.id !== id));
      toast.success("QR code deleted successfully")
    } catch (err) {
      console.error("Failed to delete qr code", err)
      toast.error("Failed to delete QR code")
    }
  };

  return {
    qrCodes,
    loading,
    error,
    handleDelete
  };
};
