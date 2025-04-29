"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useState, useRef } from "react";
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
import { PlusCircle, Trash2, UploadCloud, Loader2, Video, XCircle } from "lucide-react"; // Added Video, XCircle

// Define the validation schema with new fields
const formSchema = z.object({
  name: z.string().min(3, { message: "اسم المنتج يجب أن يكون 3 أحرف على الأقل." }),
  category: z.string({ required_error: "الرجاء اختيار قسم للمنتج." }),
  description: z.string().min(10, { message: "الوصف يجب أن يكون 10 أحرف على الأقل." }).max(500, { message: "الوصف طويل جداً (الحد الأقصى 500 حرف)." }),
  condition: z.enum(["جديد", "مستعمل"], { required_error: "الرجاء تحديد حالة المنتج." }),
  priceUSD: z.coerce.number().positive({ message: "السعر بالدولار يجب أن يكون رقماً موجباً." }),
  priceSYP: z.coerce.number().positive({ message: "السعر بالليرة يجب أن يكون رقماً موجباً." }),
  location: z.string().min(5, { message: "الموقع يجب أن يكون 5 أحرف على الأقل." }),
  phone: z.string().regex(/^(09|05)\d{8}$/, { message: "رقم الهاتف يجب أن يبدأ بـ 09 أو 05 ويتكون من 10 أرقام." }), // Updated regex for SYP numbers
  notes: z.string().max(200, { message: "الملاحظات طويلة جداً (الحد الأقصى 200 حرف)." }).optional(),
  images: z.array(z.object({ file: z.any(), preview: z.string() })).min(1, "يجب إضافة صورة واحدة على الأقل.").max(3, "يمكن إضافة 3 صور كحد أقصى."),
  video: z.object({ file: z.any().nullable(), preview: z.string().nullable() }).optional(), // Video is optional
});

// Updated categories data based on user request
const categories = [
    { value: 'furniture', label: 'أثاث منزلي' },
    { value: 'kitchen-tools', label: 'أدوات مطبخ' },
    { value: 'kids-toys', label: 'ألعاب أطفال' },
    { value: 'womens-clothing', label: 'ألبسة نسائية' },
    { value: 'mens-clothing', label: 'ألبسة رجالية' },
    { value: 'cars', label: 'سيارات' },
    { value: 'motorcycles', label: 'دراجات نارية' },
    { value: 'bicycles', label: 'دراجات هوائية' },
    { value: 'accessories', label: 'إكسسوارات عامة' },
    { value: 'agricultural-land', label: 'أراضي زراعية' },
    { value: 'real-estate', label: 'إيجار وبيع منازل ومزارع' },
    { value: 'general', label: 'قسم شامل' },
];

const MAX_VIDEO_SIZE_MB = 50; // Max video size in MB
const MAX_VIDEO_DURATION_SECONDS = 10; // Max video duration


export function AddProductForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      condition: undefined,
      priceUSD: 0,
      priceSYP: 0,
      location: "",
      phone: "",
      notes: "",
      images: [],
      video: { file: null, preview: null },
    },
  });

   const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

   const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && fields.length < 3) {
            const file = files[0];
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
                 form.clearErrors("images");
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            form.clearErrors("video"); // Clear previous errors

            // Validate video type
            if (!file.type.startsWith("video/")) {
                form.setError("video.file", { type: "manual", message: "الرجاء اختيار ملف فيديو صالح." });
                setVideoPreview(null);
                setVideoFile(null);
                 if (videoInputRef.current) videoInputRef.current.value = '';
                return;
            }

             // Validate video size
            if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
                form.setError("video.file", { type: "manual", message: `حجم الفيديو كبير جداً (الحد الأقصى ${MAX_VIDEO_SIZE_MB}MB).` });
                 setVideoPreview(null);
                 setVideoFile(null);
                  if (videoInputRef.current) videoInputRef.current.value = '';
                return;
            }


             // Validate video duration (requires loading metadata)
            const videoElement = document.createElement('video');
            videoElement.preload = 'metadata';
            videoElement.onloadedmetadata = () => {
                window.URL.revokeObjectURL(videoElement.src); // Clean up object URL
                if (videoElement.duration > MAX_VIDEO_DURATION_SECONDS) {
                     form.setError("video.file", { type: "manual", message: `مدة الفيديو طويلة جداً (الحد الأقصى ${MAX_VIDEO_DURATION_SECONDS} ثواني).` });
                     setVideoPreview(null);
                     setVideoFile(null);
                     if (videoInputRef.current) videoInputRef.current.value = '';

                } else {
                    // Duration is valid, set preview and file state
                     const reader = new FileReader();
                     reader.onloadend = () => {
                        setVideoPreview(reader.result as string);
                        setVideoFile(file);
                        form.setValue("video", { file: file, preview: reader.result as string }); // Update form state
                        form.clearErrors("video");
                     };
                     reader.readAsDataURL(file);
                }
            };
             videoElement.onerror = () => {
                 form.setError("video.file", { type: "manual", message: "لا يمكن قراءة بيانات الفيديو." });
                 setVideoPreview(null);
                 setVideoFile(null);
                 if (videoInputRef.current) videoInputRef.current.value = '';
             };
             videoElement.src = URL.createObjectURL(file);


        } else {
             // No file selected or selection cancelled
             setVideoPreview(null);
             setVideoFile(null);
             form.setValue("video", { file: null, preview: null });
             form.clearErrors("video");
             if (videoInputRef.current) videoInputRef.current.value = '';
        }
    };

     const removeVideo = () => {
        setVideoPreview(null);
        setVideoFile(null);
        form.setValue("video", { file: null, preview: null });
        form.clearErrors("video");
        if (videoInputRef.current) {
            videoInputRef.current.value = ''; // Reset file input
        }
    };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Form Submitted Values:", values);

    // **IMPORTANT:** Replace with actual product creation logic
    // 1. Upload images (values.images[x].file)
    // 2. Upload video (values.video.file) if present
    // 3. Get URLs of uploaded media.
    // 4. Save product data (including media URLs, seller ID) to DB.

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "تمت إضافة المنتج بنجاح!",
      description: `تمت إضافة المنتج "${values.name}" إلى متجرك.`,
    });
    router.push('/seller/dashboard');
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

         {/* Prices */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
                control={form.control}
                name="priceSYP"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>السعر (ليرة سورية)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="مثال: 500000" {...field} onChange={event => field.onChange(+event.target.value)} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="priceUSD"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>السعر (دولار أمريكي)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="مثال: 50" {...field} onChange={event => field.onChange(+event.target.value)} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
         </div>


        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الموقع (المدينة والحي)</FormLabel>
              <FormControl>
                <Input placeholder="مثال: دمشق، المزة" {...field} disabled={isLoading} />
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
              <FormLabel>رقم الهاتف (اتصال أو واتساب)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="09XXXXXXXX" {...field} dir="ltr" disabled={isLoading} />
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
                                <span className="font-semibold">رفع صورة</span>
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (بحد أقصى 5MB)</p>
                            <p className="text-xs text-muted-foreground">({fields.length}/3)</p>
                         </div>
                         <input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageFileChange} disabled={isLoading || fields.length >= 3} />
                     </label>
                 )}
             </div>
             <FormControl>
                <input type="hidden" {...form.register("images")} />
             </FormControl>
             <FormMessage>{form.formState.errors.images?.message || form.formState.errors.images?.root?.message}</FormMessage>
        </FormItem>

         {/* Video Upload */}
        <FormItem>
            <FormLabel>فيديو قصير للمنتج (اختياري، 10 ثواني كحد أقصى)</FormLabel>
            <div className="flex items-center gap-4">
                {!videoPreview ? (
                    <label htmlFor="video-upload" className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer h-24 w-full ${isLoading ? 'bg-muted/50 cursor-not-allowed' : 'bg-muted hover:bg-muted/80'}`}>
                        <div className="flex flex-col items-center justify-center text-center px-2">
                            <Video className={`w-8 h-8 mb-1 ${isLoading ? 'text-muted-foreground' : 'text-primary'}`} />
                            <p className={`text-sm ${isLoading ? 'text-muted-foreground' : 'text-foreground'}`}>
                                <span className="font-semibold">رفع فيديو</span>
                            </p>
                             <p className="text-xs text-muted-foreground">MP4, WEBM (حد 10 ثواني, ${MAX_VIDEO_SIZE_MB}MB)</p>
                        </div>
                        <input
                            id="video-upload"
                            ref={videoInputRef}
                            type="file"
                            className="hidden"
                            accept="video/mp4,video/webm"
                            onChange={handleVideoFileChange}
                            disabled={isLoading}
                        />
                    </label>
                ) : (
                    <div className="relative group border rounded-lg overflow-hidden aspect-video w-48">
                        <video src={videoPreview} className="object-cover w-full h-full" controls={false} />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            onClick={removeVideo}
                            disabled={isLoading}
                        >
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">إزالة الفيديو</span>
                        </Button>
                    </div>
                )}
             </div>
              <FormControl>
                  {/* Hidden input for validation binding */}
                 <input type="hidden" {...form.register("video")} />
              </FormControl>
              <FormMessage>{form.formState.errors.video?.file?.message}</FormMessage>
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
```