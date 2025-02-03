"use client"

import Image from 'next/image';
import { Button } from './ui/button';
import { useQrContext } from '@/context/QrContext';

const GeneratedQr = () => {
  const { generatedImageUrl, setGeneratedImageUrl } = useQrContext();

  const handleDiscardQr = () => {
    setGeneratedImageUrl(null)
  }
  
  return (
    <div className="rounded-lg border bg-card p-6 min-h-[200px] flex items-center justify-center">
      {generatedImageUrl ? (
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto border rounded-lg p-4 bg-white mb-4">
            <Image 
              fill
              src={generatedImageUrl} 
              alt="Generated QR Code"
              className="object-contain p-2"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={handleDiscardQr}
            className="w-full"
          >
            Discard
          </Button>
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