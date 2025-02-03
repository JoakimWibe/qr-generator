import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Loader2 } from 'lucide-react';

interface EmptyStateProps {
  className?: string;
}

export const SignInRequired = ({ className }: EmptyStateProps) => (
  <div className={`flex min-h-[70vh] items-center justify-center px-4 ${className}`}>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <QrCode className="mx-auto h-12 w-12 text-primary opacity-50" />
        <CardTitle className="mt-4">Sign In Required</CardTitle>
        <p className="text-muted-foreground">
          Please sign in to view your saved QR codes
        </p>
      </CardHeader>
    </Card>
  </div>
);

export const LoadingState = ({ className }: EmptyStateProps) => (
  <div className={`flex min-h-[70vh] items-center justify-center ${className}`}>
    <div className="text-center">
      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">Loading your QR codes...</p>
    </div>
  </div>
);

export const ErrorState = ({ className, error }: EmptyStateProps & { error: string }) => (
  <div className={`flex min-h-[70vh] items-center justify-center px-4 ${className}`}>
    <Card className="w-full max-w-md border-destructive">
      <CardHeader className="text-center">
        <CardTitle className="text-destructive">Error Loading QR Codes</CardTitle>
        <p className="text-muted-foreground">{error}</p>
      </CardHeader>
    </Card>
  </div>
);

export const NoQrCodes = ({ className }: EmptyStateProps) => (
  <div className={`flex min-h-[70vh] items-center justify-center px-4 ${className}`}>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <QrCode className="mx-auto h-12 w-12 text-primary opacity-50" />
        <CardTitle className="mt-4">No QR Codes Yet</CardTitle>
        <p className="text-muted-foreground">
          Generate and save some QR codes to see them here
        </p>
      </CardHeader>
    </Card>
  </div>
);
