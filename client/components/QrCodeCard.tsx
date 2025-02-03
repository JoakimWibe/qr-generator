"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface QrCode {
  id: string;
  title: string;
  url: string;
}

interface QrCodeCardProps {
  qrCode: QrCode;
  onDelete: (id: string, title: string) => Promise<void>;
  index: number;
}

const QrCodeCard = ({ qrCode, onDelete, index }: QrCodeCardProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode.url;
    link.download = `${qrCode.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="p-4">
          <CardTitle className="line-clamp-1 text-lg">{qrCode.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
            {qrCode.url && qrCode.url.startsWith('data:image/') && (
              <Image
                src={qrCode.url}
                alt={qrCode.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full opacity-80 transition-opacity duration-300 hover:opacity-100"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="w-full opacity-80 transition-opacity duration-300 hover:opacity-100"
              onClick={() => onDelete(qrCode.id, qrCode.title)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeCard;
