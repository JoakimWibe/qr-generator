"use client"

import Image from 'next/image';
import { Button } from './ui/button';
import { Download, Trash2 } from 'lucide-react';
import axios from 'axios';
import { Input } from './ui/input';
import { useState } from 'react';

interface QrCodePreviewProps {
  imageUrl: string;
  onDiscard: () => void;
}

const QrCodePreview = ({
  imageUrl,
  onDiscard
}: QrCodePreviewProps) => {
  const [title, setTitle] = useState('');

  const handleDownload = async () => {
    try {
      const response = await axios.get(imageUrl, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title || 'qr-code'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

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
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onDiscard}
            className="flex-1"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Discard
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QrCodePreview;
