import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sofa, CookingPot, ToyBrick, Shirt, Car, Bike, Gem, LandPlot, Home, List } from 'lucide-react'; // Updated icons

// Updated categories based on user request
const categories = [
  { name: 'أثاث منزلي', slug: 'furniture', icon: Sofa },
  { name: 'أدوات مطبخ', slug: 'kitchen-tools', icon: CookingPot },
  { name: 'ألعاب أطفال', slug: 'kids-toys', icon: ToyBrick },
  { name: 'ألبسة نسائية', slug: 'womens-clothing', icon: Shirt }, // Using Shirt as general clothing icon
  { name: 'ألبسة رجالية', slug: 'mens-clothing', icon: Shirt }, // Using Shirt as general clothing icon
  { name: 'سيارات', slug: 'cars', icon: Car },
  { name: 'دراجات نارية', slug: 'motorcycles', icon: Bike }, // Using Bike for both
  { name: 'دراجات هوائية', slug: 'bicycles', icon: Bike }, // Using Bike for both
  { name: 'إكسسوارات عامة', slug: 'accessories', icon: Gem },
  { name: 'أراضي زراعية', slug: 'agricultural-land', icon: LandPlot },
  { name: 'إيجار وبيع منازل ومزارع', slug: 'real-estate', icon: Home },
  { name: 'قسم شامل', slug: 'general', icon: List }, // Renamed 'other' to 'general' based on "قسم شامل"
];

export default function BrowsePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">تصفح الأقسام</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"> {/* Adjusted grid columns for more categories */}
        {categories.map((category) => (
          <Link href={`/browse/${category.slug}`} key={category.slug}>
            <Card className="text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer bg-card border border-border rounded-lg overflow-hidden group h-full flex flex-col">
              <CardHeader className="p-4 bg-primary/10 group-hover:bg-primary/20 transition-colors flex-grow flex items-center justify-center">
                <category.icon className="h-12 w-12 text-primary mx-auto mb-2 transition-transform group-hover:rotate-6" />
              </CardHeader>
              <CardContent className="p-3"> {/* Reduced padding slightly */}
                <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</CardTitle> {/* Adjusted text size */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
```