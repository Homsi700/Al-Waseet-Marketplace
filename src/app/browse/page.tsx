import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shirt, Sofa, Car, Gem, List } from 'lucide-react'; // Example icons

// Mock categories data
const categories = [
  { name: 'ملابس', slug: 'clothing', icon: Shirt },
  { name: 'أثاث منزلي', slug: 'furniture', icon: Sofa },
  { name: 'سيارات', slug: 'cars', icon: Car },
  { name: 'إكسسوارات', slug: 'accessories', icon: Gem },
  { name: 'أخرى', slug: 'other', icon: List },
];

export default function BrowsePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">تصفح الأقسام</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link href={`/browse/${category.slug}`} key={category.slug}>
            <Card className="text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer bg-card border border-border rounded-lg overflow-hidden group">
              <CardHeader className="p-4 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <category.icon className="h-12 w-12 text-primary mx-auto mb-2 transition-transform group-hover:rotate-6" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
