"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { useState } from "react";

// Define the validation schema using Zod
const formSchema = z.object({
  username: z.string().min(1, { message: "اسم المستخدم مطلوب." }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة." }),
});

export function SellerLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // **IMPORTANT:** Replace this with actual authentication logic
    // This is just a placeholder simulation
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // Example: Check credentials (replace with secure check)
    if (values.username === "seller" && values.password === "password") {
      toast({
        title: "نجاح تسجيل الدخول",
        description: "تم تسجيل دخولك بنجاح. يتم توجيهك...",
        variant: "default", // Use default (often greenish in themes) or create a success variant
      });
       // In a real app, you'd set a session/token here
      router.push('/seller/dashboard'); // Redirect to seller dashboard
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة.",
        variant: "destructive",
      });
       setIsLoading(false);
    }
     // No need to reset isLoading here if navigation happens on success
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المستخدم</FormLabel>
              <FormControl>
                <Input placeholder="أدخل اسم المستخدم" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="أدخل كلمة المرور" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
          {isLoading ? (
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
             <LogIn className="ml-2 h-4 w-4" />
          )}
          {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </form>
    </Form>
  );
}
