"use client"

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface QrCodePreviewProps {
  imageUrl: string;
  title: string;
  onTitleChange: (title: string) => void;
  onDiscard: () => void;
}

const QrCodePreview = ({
  imageUrl,
  title,
  onTitleChange,
  onDiscard
}: QrCodePreviewProps) => {
  return (
    <div className="text-center w-full max-w-sm">
      <div className="relative w-48 h-48 mx-auto border rounded-lg p-4 bg-white mb-4">
        <Image 
          fill
          src={imageUrl} 
          alt="Generated QR Code"
          className="object-contain p-2"
        />
      </div>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Enter title for your QR code"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onDiscard}
            className="w-full"
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QrCodePreview;
