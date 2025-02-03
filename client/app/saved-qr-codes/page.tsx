"use client"

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createAuthenticatedApi } from '@/lib/axios';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';

interface QrCode {
  id: string;
  title: string;
  url: string;
}

const SavedQrCodes = () => {
  const { data: session } = useSession();
  const [qrCodes, setQrCodes] = useState<QrCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQrCodes = async () => {
      if (!session?.token) {
        setLoading(false);
        return;
      }

      try {
        const api = createAuthenticatedApi(session.token);
        const response = await api.get('/QrCodes');
        console.log('QR Codes raw response:', response);
        console.log('QR Codes data:', response.data);
        if (response.data.length > 0) {
          console.log('First QR code URL:', response.data[0].url);
        }
        setQrCodes(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load QR codes');
      } finally {
        setLoading(false);
      }
    };

    fetchQrCodes();
  }, [session?.token]);

  const handleDelete = async (id: string) => {
    if (!session?.token) return;

    try {
      const api = createAuthenticatedApi(session.token);
      await api.delete(`/QrCodes/${id}`);
      setQrCodes(qrCodes.filter(code => code.id !== id));
    } catch (err) {
      setError('Failed to delete QR code');
    }
  };

  if (!session) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="text-center text-xl font-semibold">
            Please sign in to view your saved QR codes
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="text-center text-xl font-semibold text-red-500">
            {error}
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="text-center text-xl font-semibold">
            You haven&apos;t saved any QR codes yet
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold">Your Saved QR Codes</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {qrCodes.map((qrCode) => (
          <Card key={qrCode.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <h3 className="font-semibold">{qrCode.title}</h3>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative aspect-square w-full bg-gray-50">
                {qrCode.url && qrCode.url.startsWith('data:image/') && (
                  <Image
                    src={qrCode.url}
                    alt={qrCode.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2"
                    unoptimized
                  />
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="mt-4 w-full"
                onClick={() => handleDelete(qrCode.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedQrCodes;