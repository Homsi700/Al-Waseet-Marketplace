"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, UploadCloud, Loader2 } from "lucide-react";

// Define the validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: "اسم المنتج يجب أن يكون 3 أحرف على الأقل." }),
  category: z.string({ required_error: "الرجاء اختيار قسم للمنتج." }),
  description: z.string().min(10, { message: "الوصف يجب أن يكون 10 أحرف على الأقل." }).max(500, { message: "الوصف طويل جداً (الحد الأقصى 500 حرف)." }),
  condition: z.enum(["جديد", "مستعمل"], { required_error: "الرجاء تحديد حالة المنتج." }),
  price: z.coerce.number().positive({ message: "السعر يجب أن يكون رقماً موجباً." }),
  location: z.string().min(5, { message: "الموقع يجب أن يكون 5 أحرف على الأقل." }),
  phone: z.string().regex(/^05\d{8}$/, { message: "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام." }),
  notes: z.string().max(200, { message: "الملاحظات طويلة جداً (الحد الأقصى 200 حرف)." }).optional(),
  images: z.array(z.object({ file: z.any(), preview: z.string() })).min(1, "يجب إضافة صورة واحدة على الأقل.").max(3, "يمكن إضافة 3 صور كحد أقصى."),
});

// Mock categories data (replace with actual data if needed)
const categories = [
  { value: 'clothing', label: 'ملابس' },
  { value: 'furniture', label: 'أثاث منزلي' },
  { value: 'cars', label: 'سيارات' },
  { value: 'accessories', label: 'إكسسوارات' },
  { value: 'other', label: 'أخرى' },
];

export function AddProductForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      condition: undefined, // Start with no selection
      price: 0,
      location: "",
      phone: "",
      notes: "",
      images: [],
    },
  });

   const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && fields.length < 3) {
            const file = files[0];
             // Basic validation (optional, add more checks if needed)
             if (file.size > 5 * 1024 * 1024) { // 5MB limit
                form.setError("images", { type: "manual", message: "حجم الصورة كبير جداً (الحد الأقصى 5MB)." });
                return;
            }
            if (!file.type.startsWith("image/")) {
                 form.setError("images", { type: "manual", message: "الرجاء اختيار ملف صورة صالح." });
                 return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                append({ file: file, preview: reader.result as string });
                 form.clearErrors("images"); // Clear error if a valid image is added
            };
            reader.readAsDataURL(file);
        }
         // Reset file input to allow selecting the same file again if removed
        event.target.value = '';
    };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Form Submitted Values:", values); // Log values for debugging

    // **IMPORTANT:** Replace this with actual product creation logic
    // This involves:
    // 1. Uploading images (values.images[x].file) to a storage service (like Firebase Storage, AWS S3, Cloudinary)
    // 2. Getting the URLs of the uploaded images.
    // 3. Saving the product data (including image URLs, seller ID from session/auth) to your database.

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success
    toast({
      title: "تمت إضافة المنتج بنجاح!",
      description: `تمت إضافة المنتج "${values.name}" إلى متجرك.`,
    });
    router.push('/seller/dashboard'); // Redirect after successful addition

    // Simulate error (uncomment to test error handling)
    /*
    toast({
      title: "حدث خطأ",
      description: "لم نتمكن من إضافة المنتج. الرجاء المحاولة مرة أخرى.",
      variant: "destructive",
    });
    setIsLoading(false);
    */
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Product Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المنتج</FormLabel>
              <FormControl>
                <Input placeholder="مثال: قميص رجالي أزرق" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>القسم</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading} dir="rtl">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر قسم المنتج" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الوصف التفصيلي</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="اذكر تفاصيل المنتج، مميزاته، وأي معلومات هامة للزبون..."
                  className="resize-y min-h-[100px]"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
               <FormDescription>الحد الأقصى 500 حرف.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* Condition */}
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>حالة المنتج</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                  disabled={isLoading}
                >
                  <FormItem className="flex items-center space-x-3 space-x-reverse">
                    <FormControl>
                      <RadioGroupItem value="جديد" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      جديد
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-x-reverse">
                    <FormControl>
                      <RadioGroupItem value="مستعمل" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      مستعمل
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* Price */}
         <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>السعر (ريال سعودي)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="مثال: 150" {...field} onChange={event => field.onChange(+event.target.value)} disabled={isLoading} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />


        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الموقع (المدينة والحي)</FormLabel>
              <FormControl>
                <Input placeholder="مثال: الرياض، حي الملز" {...field} disabled={isLoading} />
              </FormControl>
               <FormDescription>سيساعد الموقع الزبائن في معرفة مكان المنتج.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف للتواصل</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="05XXXXXXXX" {...field} dir="ltr" disabled={isLoading} />
              </FormControl>
              <FormDescription>سيظهر هذا الرقم للزبائن للتواصل معك مباشرة.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ملاحظات إضافية (اختياري)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="أي تفاصيل إضافية مثل سبب البيع، عيوب بسيطة (للمستعمل)، إلخ..."
                  className="resize-y min-h-[80px]"
                  {...field}
                   disabled={isLoading}
                />
              </FormControl>
               <FormDescription>الحد الأقصى 200 حرف.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* Image Upload */}
         <FormItem>
             <FormLabel>صور المنتج (1-3 صور)</FormLabel>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {fields.map((item, index) => (
                     <div key={item.id} className="relative group border rounded-lg overflow-hidden aspect-square">
                         <Image
                            src={item.preview}
                            alt={`معاينة الصورة ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="150px"
                         />
                         <Button
                             type="button"
                             variant="destructive"
                             size="icon"
                             className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                             onClick={() => remove(index)}
                             disabled={isLoading}
                         >
                             <Trash2 className="h-4 w-4" />
                             <span className="sr-only">إزالة الصورة</span>
                         </Button>
                     </div>
                 ))}
                 {fields.length < 3 && (
                     <label htmlFor="image-upload" className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer aspect-square ${isLoading ? 'bg-muted/50 cursor-not-allowed' : 'bg-muted hover:bg-muted/80'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
                            <UploadCloud className={`w-8 h-8 mb-2 ${isLoading ? 'text-muted-foreground' : 'text-primary'}`} />
                            <p className={`mb-1 text-sm ${isLoading ? 'text-muted-foreground' : 'text-foreground'}`}>
                                <span className="font-semibold">اضغط للرفع</span>
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (بحد أقصى 5MB)</p>
                            <p className="text-xs text-muted-foreground">({fields.length}/3)</p>
                         </div>
                         <input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} disabled={isLoading || fields.length >= 3} />
                     </label>
                 )}
             </div>
             <FormControl>
                {/* Hidden input to satisfy react-hook-form controller for the array, value doesn't matter */}
                <input type="hidden" {...form.register("images")} />
             </FormControl>
             <FormMessage>{form.formState.errors.images?.message || form.formState.errors.images?.root?.message}</FormMessage>
        </FormItem>


        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
             <PlusCircle className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "جاري إضافة المنتج..." : "إضافة المنتج"}
        </Button>
      </form>
    </Form>
  );
}
