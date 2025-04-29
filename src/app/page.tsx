// Note: No 'use client' needed here if styled-jsx is removed and animations are CSS-based

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Store, ArrowLeft } from 'lucide-react'; // Use ArrowLeft for RTL 'go' indication

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/50 p-4">
      <h1 className="text-4xl font-bold text-primary mb-8 animate-fade-in-slow"> {/* Using Tailwind animation class */}
        Al-Waseet Marketplace (الوسيط)
      </h1>
      <p className="text-lg text-muted-foreground mb-12 text-center max-w-xl animate-fade-in-slow delay-200"> {/* Using Tailwind animation class */}
        منصة الوساطة الموثوقة التي تربط بين البائعين والمشترين بسهولة وأمان.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in-slow delay-400"> {/* Using Tailwind animation class */}
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl">أنا زبون</CardTitle>
            <ShoppingCart className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              تصفح آلاف المنتجات من مختلف الفئات واعثر على ما تبحث عنه.
            </CardDescription>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 group">
              <Link href="/browse">
                ابدأ التصفح
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in-slow delay-600"> {/* Using Tailwind animation class */}
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl">أنا بائع</CardTitle>
            <Store className="h-8 w-8 text-accent" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              اعرض منتجاتك لآلاف الزبائن المحتملين وقم بإدارة متجرك بسهولة.
            </CardDescription>
            <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground group">
              <Link href="/seller/login">
                تسجيل دخول البائع
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
       {/* Animations can be defined in globals.css or using Tailwind utilities if preferred */}
    </div>
  );
}
```