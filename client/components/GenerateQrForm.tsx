"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form, 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useQrContext } from '@/context/QrContext';
import { useQrGenerator } from '@/hooks/useQrGenerator';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
})

const GenerateQrForm = () => {
  const { setGeneratedImageUrl } = useQrContext();
  const { loading, generateQrCode } = useQrGenerator(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imageUrl = await generateQrCode(values.url);
    if (imageUrl) {
      setGeneratedImageUrl(imageUrl);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Website URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com" 
                  className="w-full" 
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate QR Code'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default GenerateQrForm
