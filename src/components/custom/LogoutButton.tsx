"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Button disabled variant="outline" className="min-w-[100px]">
        Loading...
      </Button>
    );
  }

  if (status === "authenticated") {
    return (
      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full gap-2"
      >
        Logout
      </Button>
    );
  }

  return null;
}
