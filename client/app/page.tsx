import GenerateQrForm from '@/components/GenerateQrForm';

export default function Home() {
  return (
    <section className='h-72 flex'>
      <h1>Generate a custom QR code!</h1>

      <GenerateQrForm />
    </section>
  );
}
