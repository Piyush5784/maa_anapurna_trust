import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

const errorMessages: Record<string, string> = {
  Configuration:
    "Authentication configuration error. Please ensure Google OAuth credentials are properly set in environment variables (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET).",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification link is invalid or has expired.",
  Default: "An error occurred during sign in.",
  EmailSignin: "There was a problem sending the email. Please try again.",
  OAuthSignin: "There was a problem signing in with the OAuth provider.",
  OAuthCallback: "There was a problem with the OAuth callback.",
  OAuthCreateAccount: "Could not create OAuth account.",
  EmailCreateAccount: "Could not create email account.",
  Callback: "There was a problem with the callback URL.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  SessionRequired: "Please sign in to access this page.",
  OAuthSignInError:
    "There was a problem signing in with Google. Please try again.",
  Unknown: "An unknown error occurred during authentication.",
};

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const error = params.error || "Default";
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Authentication Error
          </CardTitle>
          <CardDescription>There was a problem signing you in.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Try Again</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
          {error && (
            <p className="text-xs text-gray-500 mt-4">Error code: {error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
