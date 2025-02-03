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
    <>
         {generatedImageUrl && (
          <>
              <div>
                <Image width={200} height={200} src={generatedImageUrl} alt="Generated QR Code" />
                <Button onClick={handleDiscardQr}>Discard</Button>
              </div>
          </>
          )}
    </>
  )
}

export default GeneratedQr