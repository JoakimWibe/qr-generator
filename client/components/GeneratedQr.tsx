"use client"

import { useQrContext } from '@/context/QrContext';
import QrCodePreview from './QrCodePreview';

const GeneratedQr = () => {
  const { generatedImageUrl, setGeneratedImageUrl } = useQrContext();


  const handleDiscardQr = () => {
    setGeneratedImageUrl(null);
  };

  
  return (
    <div className="rounded-lg border bg-card p-6 min-h-[200px] flex items-center justify-center">
      {generatedImageUrl ? (
        <QrCodePreview
          imageUrl={generatedImageUrl}
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