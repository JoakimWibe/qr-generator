"use client"

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useQrContext } from '@/context/QrContext';
import { useSession } from 'next-auth/react';
import { createAuthenticatedApi } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useState } from 'react';

const GeneratedQr = () => {
  const { generatedImageUrl, setGeneratedImageUrl } = useQrContext();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');

  const handleDiscardQr = () => {
    setGeneratedImageUrl(null)
    setTitle('')
  }

  const handleSaveQr = async () => {
    if (!session?.token) {
      console.log('Please sign in to save QR codes');
      return;
    }

    if (!title.trim()) {
      console.log('Please enter a title');
      return;
    }

    try {
      const api = createAuthenticatedApi(session.token);
      await api.post('/QrCodes', {
        title: title.trim(),
        url: generatedImageUrl
      });

      setGeneratedImageUrl(null);
      setTitle('');
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        console.error('Error details:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
    }
  }
  
  return (
    <div className="rounded-lg border bg-card p-6 min-h-[200px] flex items-center justify-center">
      {generatedImageUrl ? (
        <div className="text-center w-full max-w-sm">
          <div className="relative w-48 h-48 mx-auto border rounded-lg p-4 bg-white mb-4">
            <Image 
              fill
              src={generatedImageUrl} 
              alt="Generated QR Code"
              className="object-contain p-2"
            />
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter title for your QR code"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleDiscardQr}
                className="w-full"
              >
                Discard
              </Button>
              <Button 
                onClick={handleSaveQr}
                className="w-full"
                disabled={!title.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">
          Your QR code will appear here
        </p>
      )}
    </div>
  )
}

export default GeneratedQr