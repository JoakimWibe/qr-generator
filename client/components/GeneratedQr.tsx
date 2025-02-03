"use client"

import { useQrContext } from '@/context/QrContext';
import QrCodePreview from './QrCodePreview';

const GeneratedQr = () => {
  const { generatedImageUrl, clearQrCode } = useQrContext();

  if (!generatedImageUrl) {
    return null;
  }

  return (
    <QrCodePreview
      imageUrl={generatedImageUrl}
      onDiscard={clearQrCode}
    />
  );
};

export default GeneratedQr;