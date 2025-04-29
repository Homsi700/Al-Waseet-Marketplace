import { EditProductForm } from '@/components/seller/edit-product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Mock function to get product data - replace with actual data fetching
const getProductDataForEdit = async (productId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    // Example data - fetch this from your DB based on productId and ensure the seller owns it
     const allProducts = [
         // Add priceUSD, priceSYP, videoUrl to mock data
        { id: '1', sellerName: 'متجر الأناقة', sellerEmail: 'style@example.com', name: 'قميص قطني', category: 'mens-clothing', description: 'قميص مريح وعصري، مصنوع من القطن بنسبة 100%.', condition: 'جديد' as "جديد" | "مستعمل", location: 'الرياض، حي العليا', phone: '0501234567', images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'], priceUSD: 15, priceSYP: 200000, notes: 'الغسيل بماء بارد.', videoUrl: null },
        { id: '4', sellerName: 'عالم الإكسسوارات', sellerEmail: 'accessories@example.com', name: 'ساعة يد أنيقة', category: 'accessories', description: 'ساعة معدنية بتصميم جذاب ولون فضي لامع.', condition: 'جديد' as "جديد" | "مستعمل", location: 'الرياض، حي النخيل', phone: '0501122334', images: ['/placeholder-7.jpg', '/placeholder-8.jpg'], priceUSD: 70, priceSYP: 950000, notes: 'تأتي بعلبة هدية.', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }, // Example with video
         { id: '2', sellerName: 'بيت الأثاث', sellerEmail: 'furniture@example.com', name: 'كنبة زاوية', category: 'furniture', description: 'كنبة زاوية واسعة.', condition: 'مستعمل' as "جديد" | "مستعمل", location: 'جدة', phone: '0559876543', images: ['/placeholder-4.jpg'], priceUSD: 250, priceSYP: 3500000, notes: 'استخدام بسيط.', videoUrl: null },
      ];
     const product = allProducts.find(p => p.id === productId);

     if (!product) return null;

    // Simulate existing image previews for the form
    const imagePreviews = product.images.map((imgUrlRelative, index) => ({
        file: null, // No file object for existing images
        preview: `https://picsum.photos/seed/${product.id}-${index}/200/200` // Placeholder for preview
    }));

    // Prepare the data for the form, including the video structure
    const productFormData = {
        ...product,
        images: imagePreviews,
        // Form expects a video object; use existing URL for preview if present
        video: {
            file: null, // No file initially
            preview: product.videoUrl || null
        },
         videoUrl: product.videoUrl // Keep original videoUrl separately if needed outside form state
    };


    return productFormData;
};


export default async function EditProductPage({ params }: { params: { productId: string } }) {
    const productData = await getProductDataForEdit(params.productId);

    if (!productData) {
        return (
             <div className="container mx-auto px-4 py-16 text-center">
                 <h1 className="text-3xl font-bold text-destructive mb-4">المنتج غير موجود</h1>
                 <p className="text-muted-foreground mb-8">لا يمكن تعديل هذا المنتج لأنه غير موجود أو ليس ملكك.</p>
                 <Button asChild>
                     <Link href="/seller/dashboard">
                         <ArrowLeft className="ml-2 h-4 w-4" />
                         العودة إلى لوحة التحكم
                     </Link>
                 </Button>
             </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/seller/dashboard" aria-label="العودة إلى لوحة التحكم">
                        <ArrowLeft className="h-5 w-5 rotate-180" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-primary mr-4">تعديل المنتج: {productData.name}</h1>
            </div>

            <Card className="w-full max-w-3xl mx-auto shadow-lg border border-border">
                <CardHeader>
                    <CardTitle>تعديل تفاصيل المنتج</CardTitle>
                    <CardDescription>قم بتحديث معلومات المنتج أدناه. يمكنك إدارة الصور والفيديو (بحد أقصى 3 صور وفيديو واحد 10 ثواني).</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Pass the prepared productData to the form */}
                    <EditProductForm productData={productData} productId={params.productId} />
                </CardContent>
            </Card>
        </div>
    );
}

```