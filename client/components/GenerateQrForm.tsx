"use client"

import { z } from "zod"
import axios from "axios"
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

const formSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
})

const GenerateQrForm = () => {
  const {setGeneratedImageUrl} = useQrContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_QRGEN_URL + "/Qr/generate" || "", {
        params: { Url: values.url },
        responseType: "blob", 
      })
      
      const imageUrl = URL.createObjectURL(response.data)
      setGeneratedImageUrl(imageUrl)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate</Button>
      </form>
    </Form>
  )
}

export default GenerateQrForm
