import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Tag, Info, ArrowLeft } from 'lucide-react'; // Added Info icon
import Link from 'next/link';

// Mock product data fetch function - replace with actual data fetching
const getProductById = async (id: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Example Product - In a real app, fetch from DB based on id
   const allProducts = [
    { id: '1', sellerName: 'متجر الأناقة', sellerEmail: 'style@example.com', name: 'قميص قطني', category: 'clothing', description: 'قميص مريح وعصري، مصنوع من القطن بنسبة 100%. يأتي بألوان متعددة ومقاسات مختلفة. مثالي للارتداء اليومي.', condition: 'جديد', location: 'الرياض، حي العليا', phone: '0501234567', images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'], price: 50, notes: 'الغسيل بماء بارد.' },
    { id: '2', sellerName: 'بيت الأثاث', sellerEmail: 'furniture@example.com', name: 'كنبة زاوية', category: 'furniture', description: 'كنبة زاوية واسعة تتسع لـ 5 أشخاص، بحالة ممتازة. قماش متين وسهل التنظيف.', condition: 'مستعمل', location: 'جدة، حي السلامة', phone: '0559876543', images: ['/placeholder-4.jpg', '/placeholder-5.jpg'], price: 800, notes: 'استخدام بسيط لمدة سنة.' },
    { id: '3', sellerName: 'معرض السيارات', sellerEmail: 'cars@example.com', name: 'سيارة سيدان اقتصادية', category: 'cars', description: 'سيارة موديل 2018، قطعت 50 ألف كم فقط. صيانة دورية في الوكالة. اقتصادية جداً في استهلاك الوقود.', condition: 'مستعمل', location: 'الدمام، حي الشاطئ', phone: '0533334444', images: ['/placeholder-6.jpg'], price: 45000, notes: 'فحص دوري جديد.' },
    { id: '4', sellerName: 'عالم الإكسسوارات', sellerEmail: 'accessories@example.com', name: 'ساعة يد أنيقة', category: 'accessories', description: 'ساعة معدنية بتصميم جذاب ولون فضي لامع. مقاومة للماء.', condition: 'جديد', location: 'الرياض، حي النخيل', phone: '0501122334', images: ['/placeholder-7.jpg', '/placeholder-8.jpg'], price: 250, notes: 'تأتي بعلبة هدية.' },
    { id: '5', sellerName: 'ورشة النجارة', sellerEmail: 'wood@example.com', name: 'طاولة طعام خشبية', category: 'furniture', description: 'طاولة طعام تتسع لـ 6 كراسي، مصنوعة من خشب الزان الصلب. تصميم كلاسيكي.', condition: 'مستعمل - حالة جيدة', location: 'مكة، حي العزيزية', phone: '0567891234', images: ['/placeholder-9.jpg'], price: 400, notes: 'تحتاج لبعض التلميع البسيط.' },
    { id: '6', sellerName: 'أزياء الشتاء', sellerEmail: 'fashion@example.com', name: 'جاكيت جلد', category: 'clothing', description: 'جاكيت جلد أسود فاخر، مبطن من الداخل. مناسب للأجواء الباردة.', condition: 'جديد', location: 'جدة، حي الروضة', phone: '0543219876', images: ['/placeholder-10.jpg'], price: 300, notes: '' },
  ];
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    // Handle not found case, maybe redirect or show a 404 component
    return null;
  }
  return product;
}

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
  const product = await getProductById(params.productId);

  if (!product) {
    return (
       <div className="container mx-auto px-4 py-16 text-center">
           <h1 className="text-3xl font-bold text-destructive mb-4">المنتج غير موجود</h1>
           <p className="text-muted-foreground mb-8">عذراً، المنتج الذي تبحث عنه لم يعد متوفراً أو تم حذفه.</p>
           <Button asChild>
                <Link href="/browse">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    العودة إلى التصفح
                </Link>
           </Button>
       </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex items-center mb-6">
         <Button variant="ghost" size="icon" asChild>
             <Link href={`/browse/${product.category}`} aria-label="العودة إلى القسم">
                 <ArrowLeft className="h-5 w-5 rotate-180" /> {/* Rotated for RTL back */}
             </Link>
         </Button>
         <h1 className="text-3xl font-bold text-primary mr-4">{product.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
           {product.images.map((img, index) => (
             <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md border">
               <Image
                 // Replace with actual image URLs or placeholder logic
                 src={`https://picsum.photos/seed/${product.id}-${index}/600/400`}
                 alt={`${product.name} - صورة ${index + 1}`}
                 fill
                 className="object-cover transition-transform duration-500 hover:scale-105"
                 sizes="(max-width: 768px) 100vw, 50vw"
                 priority={index === 0} // Prioritize the first image
               />
             </div>
           ))}
        </div>

        {/* Product Details & Seller Info */}
        <div>
          <Card className="shadow-lg border border-border">
            <CardHeader>
               <div className="flex justify-between items-start">
                 <CardTitle className="text-2xl text-primary">{product.name}</CardTitle>
                 <Badge variant="secondary" className="text-sm">{product.condition}</Badge>
               </div>
               <div className="flex items-center text-lg font-semibold text-accent mt-2">
                   <Tag className="h-5 w-5 ml-2" />
                   {product.price} ريال
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">{product.description}</p>
              {product.notes && (
                 <div className="flex items-start text-sm bg-muted/50 p-3 rounded-md border border-border">
                    <Info className="h-4 w-4 ml-2 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground"><strong className='text-foreground'>ملاحظات:</strong> {product.notes}</span>
                 </div>
              )}

              <div className="border-t border-border pt-4 space-y-3">
                <h3 className="text-xl font-semibold text-foreground mb-2">معلومات البائع</h3>
                <p className="flex items-center text-foreground">
                   <span className="font-medium ml-2">اسم البائع:</span> {product.sellerName}
                </p>
                 <div className="flex items-center text-foreground">
                   <MapPin className="h-5 w-5 ml-2 text-primary" />
                   <span className="font-medium ml-1">الموقع:</span> {product.location}
                 </div>
                 <div className="flex items-center text-foreground">
                   <Phone className="h-5 w-5 ml-2 text-accent" />
                    <span className="font-medium ml-1">رقم الهاتف:</span>
                    <a href={`tel:${product.phone}`} className="text-accent hover:underline mr-1" dir="ltr">{product.phone}</a>
                 </div>
                 <div className="flex items-center text-foreground">
                    <Mail className="h-5 w-5 ml-2 text-primary/80" />
                    <span className="font-medium ml-1">البريد الإلكتروني:</span>
                    <a href={`mailto:${product.sellerEmail}`} className="text-primary/80 hover:underline mr-1">{product.sellerEmail}</a>
                 </div>
              </div>

              <Button size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground group">
                 <Phone className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                 <a href={`tel:${product.phone}`}>اتصل بالبائع مباشرة</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Add generateStaticParams if you know the product IDs beforehand
// export async function generateStaticParams() { ... }