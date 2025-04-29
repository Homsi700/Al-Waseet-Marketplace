import { AddProductForm } from '@/components/seller/add-product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AddProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
         <Button variant="ghost" size="icon" asChild>
             <Link href="/seller/dashboard" aria-label="العودة إلى لوحة التحكم">
                 <ArrowLeft className="h-5 w-5 rotate-180" /> {/* Rotated for RTL back */}
             </Link>
         </Button>
         <h1 className="text-3xl font-bold text-primary mr-4">إضافة منتج جديد</h1>
      </div>

      <Card className="w-full max-w-3xl mx-auto shadow-lg border border-border">
        <CardHeader>
          <CardTitle>تفاصيل المنتج</CardTitle>
          <CardDescription>املأ الحقول أدناه لإضافة منتج جديد إلى متجرك. يمكنك إضافة ما يصل إلى 3 صور.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
