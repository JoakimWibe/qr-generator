"use client"

import { useSession } from 'next-auth/react';
import QrCodeCard from '@/components/QrCodeCard';
import { SignInRequired, LoadingState, ErrorState, NoQrCodes } from '@/components/QrCodeEmptyStates';
import { useQrCodes } from '@/hooks/useQrCodes';

const SavedQrCodes = () => {
  const { data: session } = useSession();
  const { qrCodes, loading, error, handleDelete } = useQrCodes(session?.token);

  if (!session) {
    return <SignInRequired />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (qrCodes.length === 0) {
    return <NoQrCodes />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Your QR Codes</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {qrCodes.map((qrCode, index) => (
          <QrCodeCard
            key={qrCode.id}
            qrCode={qrCode}
            onDelete={handleDelete}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedQrCodes;