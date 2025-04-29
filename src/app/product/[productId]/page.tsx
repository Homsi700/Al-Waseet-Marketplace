import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Tag, Info, ArrowLeft, DollarSign, Video } from 'lucide-react'; // Added DollarSign, Video
import Link from 'next/link';

// Mock product data fetch function - replace with actual data fetching
const getProductById = async (id: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Example Product - In a real app, fetch from DB based on id
   const allProducts = [
    // Update existing products with priceUSD, priceSYP, videoUrl
    { id: '1', sellerName: 'متجر الأناقة', sellerEmail: 'style@example.com', name: 'قميص قطني', category: 'mens-clothing', description: 'قميص مريح وعصري، مصنوع من القطن بنسبة 100%. يأتي بألوان متعددة ومقاسات مختلفة. مثالي للارتداء اليومي.', condition: 'جديد', location: 'الرياض، حي العليا', phone: '0501234567', images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'], priceUSD: 15, priceSYP: 200000, notes: 'الغسيل بماء بارد.', videoUrl: null },
    { id: '2', sellerName: 'بيت الأثاث', sellerEmail: 'furniture@example.com', name: 'كنبة زاوية', category: 'furniture', description: 'كنبة زاوية واسعة تتسع لـ 5 أشخاص، بحالة ممتازة. قماش متين وسهل التنظيف.', condition: 'مستعمل', location: 'جدة، حي السلامة', phone: '0559876543', images: ['/placeholder-4.jpg', '/placeholder-5.jpg'], priceUSD: 250, priceSYP: 3500000, notes: 'استخدام بسيط لمدة سنة.', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }, // Example video
    { id: '3', sellerName: 'معرض السيارات', sellerEmail: 'cars@example.com', name: 'سيارة سيدان اقتصادية', category: 'cars', description: 'سيارة موديل 2018، قطعت 50 ألف كم فقط. صيانة دورية في الوكالة. اقتصادية جداً في استهلاك الوقود.', condition: 'مستعمل', location: 'الدمام، حي الشاطئ', phone: '0533334444', images: ['/placeholder-6.jpg'], priceUSD: 12000, priceSYP: 160000000, notes: 'فحص دوري جديد.', videoUrl: null },
    { id: '4', sellerName: 'عالم الإكسسوارات', sellerEmail: 'accessories@example.com', name: 'ساعة يد أنيقة', category: 'accessories', description: 'ساعة معدنية بتصميم جذاب ولون فضي لامع. مقاومة للماء.', condition: 'جديد', location: 'الرياض، حي النخيل', phone: '0501122334', images: ['/placeholder-7.jpg', '/placeholder-8.jpg'], priceUSD: 70, priceSYP: 950000, notes: 'تأتي بعلبة هدية.', videoUrl: null },
    { id: '5', sellerName: 'ورشة النجارة', sellerEmail: 'wood@example.com', name: 'طاولة طعام خشبية', category: 'furniture', description: 'طاولة طعام تتسع لـ 6 كراسي، مصنوعة من خشب الزان الصلب. تصميم كلاسيكي.', condition: 'مستعمل - حالة جيدة', location: 'مكة، حي العزيزية', phone: '0567891234', images: ['/placeholder-9.jpg'], priceUSD: 110, priceSYP: 1500000, notes: 'تحتاج لبعض التلميع البسيط.', videoUrl: null },
    { id: '6', sellerName: 'أزياء الشتاء', sellerEmail: 'fashion@example.com', name: 'جاكيت جلد', category: 'mens-clothing', description: 'جاكيت جلد أسود فاخر، مبطن من الداخل. مناسب للأجواء الباردة.', condition: 'جديد', location: 'جدة، حي الروضة', phone: '0543219876', images: ['/placeholder-10.jpg'], priceUSD: 80, priceSYP: 1100000, notes: '', videoUrl: null },
    { id: '7', sellerName: 'بيت الأدوات', sellerEmail: 'kitchen@example.com', name: 'خلاط كهربائي', category: 'kitchen-tools', description: 'خلاط متعدد السرعات بقوة 500 واط.', condition: 'جديد', location: 'الرياض', phone: '0509988776', images: ['/placeholder-11.jpg'], priceUSD: 40, priceSYP: 550000, notes: '', videoUrl: null },
    { id: '8', sellerName: 'بوتيك الفساتين', sellerEmail: 'dresses@example.com', name: 'فستان سهرة', category: 'womens-clothing', description: 'فستان طويل بتصميم أنيق للمناسبات.', condition: 'مستعمل', location: 'جدة', phone: '0551122334', images: ['/placeholder-12.jpg'], priceUSD: 60, priceSYP: 800000, notes: 'لبسة واحدة فقط.', videoUrl: null },
    { id: '9', sellerName: 'متجر الدراجات', sellerEmail: 'bikes@example.com', name: 'دراجة هوائية جبلية', category: 'bicycles', description: 'دراجة هوائية مناسبة للطرق الوعرة.', condition: 'جديد', location: 'الدمام', phone: '0534455667', images: ['/placeholder-13.jpg'], priceUSD: 200, priceSYP: 2800000, notes: '21 سرعة.', videoUrl: null },
    { id: '10', sellerName: 'مكتب عقاري', sellerEmail: 'realestate@example.com', name: 'مزرعة للبيع', category: 'real-estate', description: 'مزرعة بمساحة 5000 متر مربع مع بئر ماء.', condition: 'مستعمل', location: 'القصيم', phone: '0567788990', images: ['/placeholder-14.jpg'], priceUSD: 100000, priceSYP: 1400000000, notes: 'صك شرعي الكتروني.', videoUrl: null },
   ];
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    return null;
  }
  return product;
}

// Helper function to format currency (same as in category page)
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
         {/* Media Column: Images and Video */}
        <div className="flex flex-col gap-4">
           {/* Video Player (if videoUrl exists) */}
           {product.videoUrl && (
             <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md border bg-black">
               <video
                 src={product.videoUrl}
                 controls
                 className="w-full h-full object-contain"
                 poster={product.images.length > 0 ? `https://picsum.photos/seed/${product.id}-0/600/400` : undefined} // Use first image as poster
               >
                 عذراً، متصفحك لا يدعم عرض الفيديو.
               </video>
               <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center">
                 <Video className="h-3 w-3 mr-1" />
                 <span>فيديو المنتج (10 ثواني)</span>
               </div>
             </div>
           )}

           {/* Image Gallery */}
           {product.images.map((imgUrlRelative, index) => (
             <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md border">
               <Image
                 // Replace with actual image URLs or placeholder logic
                 src={`https://picsum.photos/seed/${product.id}-${index}/600/400`} // Using placeholder logic based on ID and index
                 alt={`${product.name} - صورة ${index + 1}`}
                 fill
                 className="object-cover transition-transform duration-500 hover:scale-105"
                 sizes="(max-width: 768px) 100vw, 50vw"
                 priority={index === 0 && !product.videoUrl} // Prioritize the first image if no video
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
                {/* Dual Price Display */}
                <div className="flex items-baseline space-x-3 space-x-reverse mt-3">
                    <div className="flex items-center text-2xl font-bold text-accent">
                        <Tag className="h-6 w-6 ml-2" />
                        {formatCurrency(product.priceSYP, 'SYP')}
                    </div>
                    <div className="flex items-center text-base text-muted-foreground">
                        (<DollarSign className="h-4 w-4 ml-1" />
                        {formatCurrency(product.priceUSD, 'USD')})
                    </div>
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
                    <span className="font-medium ml-1">رقم الهاتف (اتصال/واتساب):</span>
                    <a href={`https://wa.me/${product.phone.replace(/^0/, '+963')}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mr-1" dir="ltr">{product.phone}</a>
                    <span className="mx-1 text-muted-foreground">|</span>
                    <a href={`tel:${product.phone}`} className="text-accent hover:underline mr-1" dir="ltr">اتصال مباشر</a>
                 </div>
                 <div className="flex items-center text-foreground">
                    <Mail className="h-5 w-5 ml-2 text-primary/80" />
                    <span className="font-medium ml-1">البريد الإلكتروني:</span>
                    <a href={`mailto:${product.sellerEmail}`} className="text-primary/80 hover:underline mr-1">{product.sellerEmail}</a>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                 <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground group">
                     <Phone className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                     <a href={`tel:${product.phone}`}>اتصل بالبائع</a>
                 </Button>
                  <Button size="lg" variant="outline" className="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white group">
                      {/* WhatsApp Icon SVG or Lucide equivalent if available */}
                     <svg className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.69-1.04-5.2-2.91-7.06zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42 1.56 1.56 2.41 3.63 2.41 5.83.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.21.25-.34c.08-.14.04-.25-.02-.38-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.48 1.07 2.48.71 2.93.69h.01c.39-.03 1.21-.49 1.38-.97s.17-1.48.12-1.61c-.05-.12-.17-.18-.38-.31z"></path></svg>
                     <a href={`https://wa.me/${product.phone.replace(/^0/, '+963')}`} target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a>
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```