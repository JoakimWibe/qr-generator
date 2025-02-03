import GeneratedQr from '@/components/GeneratedQr';
import GenerateQrForm from '@/components/GenerateQrForm';

export default function Home() {
  return (
    <section className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold theme-text">QR Code Generator</h1>
          <p className="text-muted-foreground">Generate custom QR codes for your URLs instantly</p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-lg border bg-card p-6">
            <GenerateQrForm />
          </div>

          <GeneratedQr />
        </div>
      </div>
    </section>
  );
}
