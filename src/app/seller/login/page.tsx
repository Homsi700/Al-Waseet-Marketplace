import { SellerLoginForm } from '@/components/seller/seller-login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SellerLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-xl border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">تسجيل دخول البائع</CardTitle>
          <CardDescription>الرجاء إدخال بيانات الاعتماد الخاصة بك للوصول إلى لوحة تحكم البائع.</CardDescription>
        </CardHeader>
        <CardContent>
          <SellerLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
