import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Home, LogIn } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized Access | MAT",
  description: "You don't have permission to access this page.",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500">
              This area is restricted to administrators only.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full" variant="default">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>

            <Link href="/api/auth/signin" className="block">
              <Button className="w-full" variant="outline">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In with Different Account
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400">
              If you believe this is an error, please contact the administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
