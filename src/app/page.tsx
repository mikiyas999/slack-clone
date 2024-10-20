"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSubmit = async () => {
    await signOut();
    router.push("/auth");
  };
  return (
    <div>
      Logged in
      <Button onClick={handleSubmit}>Sign out</Button>
    </div>
  );
}
