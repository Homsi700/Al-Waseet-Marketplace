import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye, DollarSign } from 'lucide-react'; // Added DollarSign

// Mock Seller's Products Data - Replace with actual data fetching for the logged-in seller
// Add priceUSD and priceSYP
const getSellerProducts = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Fetch products specifically for the logged-in seller (using auth context/session)
  return [
    { id: '1', name: 'قميص قطني', category: 'mens-clothing', condition: 'جديد', priceUSD: 15, priceSYP: 200000, stock: 10, images: ['/placeholder-1.jpg'] },
    { id: '4', name: 'ساعة يد أنيقة', category: 'accessories', condition: 'جديد', priceUSD: 70, priceSYP: 950000, stock: 5, images: ['/placeholder-7.jpg'] },
    // Add more products listed by this specific seller
  ];
}

// Helper function to format currency (consider moving to a utils file)
const formatCurrency = (amount: number, currency: 'USD' | 'SYP') => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  if (currency === 'SYP') {
    return `${amount.toLocaleString('ar-SY')} ل.س`;
  }
  return amount.toLocaleString('en-US', options);
};


export default async function SellerDashboardPage() {
  const products = await getSellerProducts();
  const canAddMore = products.length < 50;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">لوحة تحكم البائع</h1>
        <Button asChild disabled={!canAddMore} className="bg-accent hover:bg-accent/90 text-accent-foreground">
           {/* Link will be disabled via parent Button's disabled state styling */}
          <Link href="/seller/add-product">
            <PlusCircle className="ml-2 h-5 w-5" />
            إضافة منتج جديد
          </Link>
        </Button>
      </div>

       {!canAddMore && (
          <p className="text-sm text-destructive mb-4 text-center p-3 bg-destructive/10 rounded-md border border-destructive">
              لقد وصلت إلى الحد الأقصى لعدد المنتجات المسموح به (50 منتج).
          </p>
       )}

      <Card className="shadow-lg border border-border">
        <CardHeader>
          <CardTitle>منتجاتي المعروضة</CardTitle>
          <CardDescription>إدارة المنتجات الخاصة بك في المتجر.</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
             <p className="text-center text-muted-foreground py-8">لم تقم بإضافة أي منتجات بعد.</p>
          ) : (
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[80px]">صورة</TableHead>
                    <TableHead>اسم المنتج</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-right">السعر (ل.س)</TableHead>
                    <TableHead className="text-right">السعر (USD)</TableHead>
                    {/* <TableHead className="text-right">المخزون</TableHead> */}
                    <TableHead className="text-center">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                           <div className="relative h-12 w-12 rounded-md overflow-hidden border">
                             <Image
                                // Use placeholder image logic
                                src={`https://picsum.photos/seed/${product.id}/100/100`}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="50px"
                              />
                           </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                           <Badge variant={product.condition === 'جديد' ? 'default' : 'secondary'}>{product.condition}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(product.priceSYP, 'SYP')}</TableCell>
                         <TableCell className="text-right text-muted-foreground">{formatCurrency(product.priceUSD, 'USD')}</TableCell>
                        {/* <TableCell className="text-right">{product.stock}</TableCell> */}
                        <TableCell className="text-center">
                           <div className="flex justify-center space-x-1 space-x-reverse">
                             <Button variant="ghost" size="icon" asChild title="عرض المنتج">
                               <Link href={`/product/${product.id}`}>
                                 <Eye className="h-4 w-4 text-primary" />
                               </Link>
                             </Button>
                             <Button variant="ghost" size="icon" asChild title="تعديل المنتج">
                               <Link href={`/seller/edit-product/${product.id}`}>
                                 <Edit className="h-4 w-4 text-yellow-600" />
                               </Link>
                             </Button>
                             <Button variant="ghost" size="icon" title="حذف المنتج" onClick={() => alert('سيتم تنفيذ الحذف هنا')}>
                               <Trash2 className="h-4 w-4 text-destructive" />
                             </Button>
                           </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
             </Table>
          )}
        </CardContent>
        {/* Optional: Add Pagination if many products */}
        {/* <CardFooter className="flex justify-center">
           <p>Pagination Controls Here</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
```