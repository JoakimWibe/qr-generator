"use client"

import { useQrContext } from '@/context/QrContext';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useQrGenerator } from '@/hooks/useQrGenerator';
import QrCodePreview from './QrCodePreview';

const GeneratedQr = () => {
  const { generatedImageUrl, setGeneratedImageUrl } = useQrContext();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const { saveQrCode } = useQrGenerator(session?.token);

  const handleDiscardQr = () => {
    setGeneratedImageUrl(null);
    setTitle('');
  };

  const handleSaveQr = async () => {
    if (generatedImageUrl && await saveQrCode(title, generatedImageUrl)) {
      setGeneratedImageUrl(null);
      setTitle('');
    }
  };
  
  return (
    <div className="rounded-lg border bg-card p-6 min-h-[200px] flex items-center justify-center">
      {generatedImageUrl ? (
        <QrCodePreview
          imageUrl={generatedImageUrl}
          title={title}
          onTitleChange={setTitle}
          onSave={handleSaveQr}
          onDiscard={handleDiscardQr}
        />
      ) : (
        <p className="text-muted-foreground">
          Your QR code will appear here
        </p>
      )}
    </div>
  );
};

export default GeneratedQr;