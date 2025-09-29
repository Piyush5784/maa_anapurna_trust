"use client";
import { LogIn, Settings } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ROLE_ADMIN } from "../static/SD";

export default function LoginButton() {
  const session = useSession();

  if (session?.status == "loading") {
    return (
      <Button disabled variant="outline" className="min-w-[100px]">
        Loading...
      </Button>
    );
  }

  if (session.status == "unauthenticated") {
    return (
      <Button asChild variant="default" className="gap-2">
        <Link href="/auth/signin">
          <LogIn className="h-4 w-4" />
          Sign In
        </Link>
      </Button>
    );
  }

  if (session.data?.user.role == ROLE_ADMIN)
    return (
      <>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/Manage">
            <Settings className="h-4 w-4" />
            Manage
          </Link>
        </Button>
      </>
    );
  if (session.data?.user.role !== ROLE_ADMIN)
    return (
      <>
        <Button variant="outline" disabled className="gap-2">
          Admin Only
        </Button>
      </>
    );
}
