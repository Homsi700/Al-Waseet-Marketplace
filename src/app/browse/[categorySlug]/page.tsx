import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Tag, ArrowLeft } from 'lucide-react'; // Use ArrowLeft for RTL 'go'

// Mock product data - replace with actual data fetching
const getProductsByCategory = async (slug: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Example Products - In a real app, fetch from DB based on slug
   const allProducts = [
    { id: '1', name: 'قميص قطني', category: 'clothing', description: 'قميص مريح وعصري، مصنوع من القطن بنسبة 100%.', condition: 'جديد', location: 'الرياض', phone: '0501234567', images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'], price: 50 },
    { id: '2', name: 'كنبة زاوية', category: 'furniture', description: 'كنبة زاوية واسعة تتسع لـ 5 أشخاص، بحالة ممتازة.', condition: 'مستعمل', location: 'جدة', phone: '0559876543', images: ['/placeholder-4.jpg', '/placeholder-5.jpg'], price: 800 },
    { id: '3', name: 'سيارة سيدان اقتصادية', category: 'cars', description: 'سيارة موديل 2018، قطعت 50 ألف كم فقط.', condition: 'مستعمل', location: 'الدمام', phone: '0533334444', images: ['/placeholder-6.jpg'], price: 45000 },
    { id: '4', name: 'ساعة يد أنيقة', category: 'accessories', description: 'ساعة معدنية بتصميم جذاب.', condition: 'جديد', location: 'الرياض', phone: '0501122334', images: ['/placeholder-7.jpg', '/placeholder-8.jpg'], price: 250 },
    { id: '5', name: 'طاولة طعام خشبية', category: 'furniture', description: 'طاولة طعام تتسع لـ 6 كراسي، مصنوعة من خشب الزان.', condition: 'مستعمل - حالة جيدة', location: 'مكة', phone: '0567891234', images: ['/placeholder-9.jpg'], price: 400 },
     { id: '6', name: 'جاكيت جلد', category: 'clothing', description: 'جاكيت جلد أسود، مناسب للشتاء.', condition: 'جديد', location: 'جدة', phone: '0543219876', images: ['/placeholder-10.jpg'], price: 300 },
   ];

  return allProducts.filter(p => p.category === slug);
}

export default async function CategoryProductsPage({ params }: { params: { categorySlug: string } }) {
  const products = await getProductsByCategory(params.categorySlug);
  const categoryName = params.categorySlug.charAt(0).toUpperCase() + params.categorySlug.slice(1); // Simple capitalization

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
                  src={`https://picsum.photos/seed/${product.id}/400/300`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={products.indexOf(product) < 4} // Prioritize images for first few cards
                />
                <Badge variant="secondary" className="absolute top-2 right-2">
                   {product.condition}
                </Badge>
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
                 <div className="flex items-center text-sm text-muted-foreground">
                     <Tag className="h-4 w-4 ml-1 text-accent" />
                     <span className="font-semibold text-foreground">{product.price} ريال</span>
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

// Add generateStaticParams for better performance if categories are known
export async function generateStaticParams() {
 const categories = [
   { slug: 'clothing' },
   { slug: 'furniture' },
   { slug: 'cars' },
   { slug: 'accessories' },
   { slug: 'other' },
 ];

 return categories.map((category) => ({
   categorySlug: category.slug,
 }));
}