import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Tag, ArrowLeft, DollarSign } from 'lucide-react'; // Added DollarSign

// Mock product data - replace with actual data fetching
const getProductsByCategory = async (slug: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Example Products - In a real app, fetch from DB based on slug
   const allProducts = [
     // Existing products need priceUSD and priceSYP, remove old price
     // Add videoUrl if available
    { id: '1', name: 'قميص قطني', category: 'mens-clothing', description: 'قميص مريح وعصري، مصنوع من القطن بنسبة 100%.', condition: 'جديد', location: 'الرياض', phone: '0501234567', images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'], priceUSD: 15, priceSYP: 200000, videoUrl: null },
    { id: '2', name: 'كنبة زاوية', category: 'furniture', description: 'كنبة زاوية واسعة تتسع لـ 5 أشخاص، بحالة ممتازة.', condition: 'مستعمل', location: 'جدة', phone: '0559876543', images: ['/placeholder-4.jpg', '/placeholder-5.jpg'], priceUSD: 250, priceSYP: 3500000, videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }, // Example video URL
    { id: '3', name: 'سيارة سيدان اقتصادية', category: 'cars', description: 'سيارة موديل 2018، قطعت 50 ألف كم فقط.', condition: 'مستعمل', location: 'الدمام', phone: '0533334444', images: ['/placeholder-6.jpg'], priceUSD: 12000, priceSYP: 160000000, videoUrl: null },
    { id: '4', name: 'ساعة يد أنيقة', category: 'accessories', description: 'ساعة معدنية بتصميم جذاب.', condition: 'جديد', location: 'الرياض', phone: '0501122334', images: ['/placeholder-7.jpg', '/placeholder-8.jpg'], priceUSD: 70, priceSYP: 950000, videoUrl: null },
    { id: '5', name: 'طاولة طعام خشبية', category: 'furniture', description: 'طاولة طعام تتسع لـ 6 كراسي، مصنوعة من خشب الزان.', condition: 'مستعمل - حالة جيدة', location: 'مكة', phone: '0567891234', images: ['/placeholder-9.jpg'], priceUSD: 110, priceSYP: 1500000, videoUrl: null },
    { id: '6', name: 'جاكيت جلد', category: 'mens-clothing', description: 'جاكيت جلد أسود، مناسب للشتاء.', condition: 'جديد', location: 'جدة', phone: '0543219876', images: ['/placeholder-10.jpg'], priceUSD: 80, priceSYP: 1100000, videoUrl: null },
    { id: '7', name: 'خلاط كهربائي', category: 'kitchen-tools', description: 'خلاط متعدد السرعات بقوة 500 واط.', condition: 'جديد', location: 'الرياض', phone: '0509988776', images: ['/placeholder-11.jpg'], priceUSD: 40, priceSYP: 550000, videoUrl: null },
    { id: '8', name: 'فستان سهرة', category: 'womens-clothing', description: 'فستان طويل بتصميم أنيق للمناسبات.', condition: 'مستعمل', location: 'جدة', phone: '0551122334', images: ['/placeholder-12.jpg'], priceUSD: 60, priceSYP: 800000, videoUrl: null },
    { id: '9', name: 'دراجة هوائية جبلية', category: 'bicycles', description: 'دراجة هوائية مناسبة للطرق الوعرة.', condition: 'جديد', location: 'الدمام', phone: '0534455667', images: ['/placeholder-13.jpg'], priceUSD: 200, priceSYP: 2800000, videoUrl: null },
    { id: '10', name: 'مزرعة للبيع', category: 'real-estate', description: 'مزرعة بمساحة 5000 متر مربع مع بئر ماء.', condition: 'مستعمل', location: 'القصيم', phone: '0567788990', images: ['/placeholder-14.jpg'], priceUSD: 100000, priceSYP: 1400000000, videoUrl: null },
   ];

   // Map old category slugs if necessary, or filter directly by new slugs
   const categoryMap: { [key: string]: string[] } = {
     'furniture': ['furniture'],
     'kitchen-tools': ['kitchen-tools'],
     'kids-toys': ['kids-toys'],
     'womens-clothing': ['womens-clothing'],
     'mens-clothing': ['mens-clothing', 'clothing'], // Map old 'clothing' if needed
     'cars': ['cars'],
     'motorcycles': ['motorcycles'],
     'bicycles': ['bicycles'],
     'accessories': ['accessories'],
     'agricultural-land': ['agricultural-land'],
     'real-estate': ['real-estate'],
     'general': ['general', 'other'] // Map old 'other' if needed
   };

  const relevantCategories = categoryMap[slug] || [slug];
  return allProducts.filter(p => relevantCategories.includes(p.category));
}

// Helper function to format currency
const formatCurrency = (amount: number, currency: 'USD' | 'SYP') => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  // Adjust for SYP symbol if needed, JS Intl might not support it well
  if (currency === 'SYP') {
      return `${amount.toLocaleString('ar-SY')} ل.س`;
  }
  return amount.toLocaleString('en-US', options);
};


export default async function CategoryProductsPage({ params }: { params: { categorySlug: string } }) {
  const products = await getProductsByCategory(params.categorySlug);
   // Find the category name from the static params list or a categories array
   const categories = await generateStaticParams();
   const categoryInfo = categories.find(cat => cat.categorySlug === params.categorySlug);
   // A simple fallback name generation if not found (shouldn't happen with generateStaticParams)
   const categoryName = categoryInfo?.name || params.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
         <Button variant="ghost" size="icon" asChild>
             <Link href="/browse" aria-label="العودة إلى الأقسام">
                 <ArrowLeft className="h-5 w-5 rotate-180" /> {/* Rotated for RTL back */}
             </Link>
         </Button>
         <h1 className="text-3xl font-bold text-primary mr-4">منتجات قسم {categoryName}</h1>
      </div>

      {products.length === 0 ? (
         <p className="text-center text-muted-foreground text-lg mt-12">لا توجد منتجات في هذا القسم حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0 relative aspect-video">
                <Image
                  // Use placeholder image logic
                  src={`https://picsum.photos/seed/${product.id}/400/300`} // Assume first image is primary
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={products.indexOf(product) < 4} // Prioritize images for first few cards
                />
                <Badge variant="secondary" className="absolute top-2 right-2">
                   {product.condition}
                </Badge>
                 {product.videoUrl && (
                     <div className="absolute bottom-2 left-2 bg-black/50 text-white p-1 rounded">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                         </svg>
                         فيديو
                     </div>
                 )}
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">
                   <Link href={`/product/${product.id}`}>{product.name}</Link>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</CardDescription>
                 <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4 ml-1 text-primary" />
                    {product.location}
                 </div>
                 <div className="flex items-center text-sm text-muted-foreground space-x-2 space-x-reverse"> {/* Dual price display */}
                     <div className="flex items-center font-semibold text-foreground">
                         <Tag className="h-4 w-4 ml-1 text-accent" />
                         {formatCurrency(product.priceSYP, 'SYP')}
                     </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                         (<DollarSign className="h-3 w-3 ml-0.5" />
                         {formatCurrency(product.priceUSD, 'USD')})
                     </div>
                  </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                 <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group">
                   <Link href={`/product/${product.id}`}>
                     عرض التفاصيل والتواصل
                     <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                   </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Update generateStaticParams with the new categories including names for display
export async function generateStaticParams() {
 const categories = [
    { name: 'أثاث منزلي', categorySlug: 'furniture' },
    { name: 'أدوات مطبخ', categorySlug: 'kitchen-tools' },
    { name: 'ألعاب أطفال', categorySlug: 'kids-toys' },
    { name: 'ألبسة نسائية', categorySlug: 'womens-clothing' },
    { name: 'ألبسة رجالية', categorySlug: 'mens-clothing' },
    { name: 'سيارات', categorySlug: 'cars' },
    { name: 'دراجات نارية', categorySlug: 'motorcycles' },
    { name: 'دراجات هوائية', categorySlug: 'bicycles' },
    { name: 'إكسسوارات عامة', categorySlug: 'accessories' },
    { name: 'أراضي زراعية', categorySlug: 'agricultural-land' },
    { name: 'إيجار وبيع منازل ومزارع', categorySlug: 'real-estate' },
    { name: 'قسم شامل', categorySlug: 'general' },
    // Include old slugs if you need to support them temporarily during transition
    // { name: 'ملابس', categorySlug: 'clothing' },
    // { name: 'أخرى', categorySlug: 'other' },
 ];

 return categories;
}
```