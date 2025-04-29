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
        { id: '1', sellerName: 'متجر الأناقة', sellerEmail: 'style@example.com', name: 'قميص قطني', category: 'clothing', description: 'قميص مريح وعصري، مصنوع من القطن بنسبة 100%. يأتي بألوان متعددة ومقاسات مختلفة. مثالي للارتداء اليومي.', condition: 'جديد' as "جديد" | "مستعمل", location: 'الرياض، حي العليا', phone: '0501234567', images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'], price: 50, notes: 'الغسيل بماء بارد.' },
        { id: '4', sellerName: 'عالم الإكسسوارات', sellerEmail: 'accessories@example.com', name: 'ساعة يد أنيقة', category: 'accessories', description: 'ساعة معدنية بتصميم جذاب ولون فضي لامع. مقاومة للماء.', condition: 'جديد' as "جديد" | "مستعمل", location: 'الرياض، حي النخيل', phone: '0501122334', images: ['/placeholder-7.jpg', '/placeholder-8.jpg'], price: 250, notes: 'تأتي بعلبة هدية.' },
      ];
     const product = allProducts.find(p => p.id === productId);

     if (!product) return null;

    // Simulate existing image previews for the form
    // In a real app, these would be the actual URLs from your storage
    const imagePreviews = product.images.map((imgUrl, index) => ({
        file: null, // No actual file object when editing, just the URL
        preview: `https://picsum.photos/seed/${product.id}-${index}/200/200` // Use placeholder for preview
    }));


    return { ...product, images: imagePreviews };
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
                    <CardDescription>قم بتحديث معلومات المنتج أدناه. يمكنك إدارة الصور الحالية وإضافة صور جديدة (بحد أقصى 3).</CardDescription>
                </CardHeader>
                <CardContent>
                    <EditProductForm productData={productData} productId={params.productId} />
                </CardContent>
            </Card>
        </div>
    );
}
