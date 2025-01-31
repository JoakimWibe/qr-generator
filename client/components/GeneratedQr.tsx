"use client"

import { useQrCodeStore } from '@/context/useQrCodeStore';
import Image from 'next/image';
import { Button } from './ui/button';

const GeneratedQr = () => {
  const { imageUrl, setImageUrl } = useQrCodeStore();

  const handleDiscardQr = () => {
    setImageUrl(null)
  }

  const handleSaveQr = () => {
     console.log("Saved!", imageUrl)
  }
  
  return (
    <>
         {imageUrl && (
              <div>
                <Image width={200} height={200} src={imageUrl} alt="Generated QR Code" />
                <Button onClick={handleDiscardQr}>Discard</Button>
                <Button onClick={handleSaveQr}>Save</Button>
              </div>
            )}
    </>
  )
}

export default GeneratedQr