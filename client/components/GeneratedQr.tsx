"use client"

import { useQrContext } from '@/context/QrContext';
import QrCodePreview from './QrCodePreview';

const GeneratedQr = () => {
  const { generatedImageUrl, clearQrCode } = useQrContext();

  if (!generatedImageUrl) {
    return (
      <div className="rounded-lg border bg-card p-6 min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">
          Your QR code will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6 min-h-[200px] flex items-center justify-center">
      <QrCodePreview
        imageUrl={generatedImageUrl}
        onDiscard={clearQrCode}
      />
    </div>
  );
};

export default GeneratedQr;