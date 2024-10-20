"use client";

import { useAuthActions } from "@convex-dev/auth/react";

import { Loader2, LogOut } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/app/auth/api/useCurrentUser";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const { user, isLoading } = useCurrentUser();
  console.log(user);
  if (isLoading) {
    return (
      <span className="size-10 rounded-md bg-neutral-500 animate-pulse transition-colors" />
    );
  }

  if (!user) return null;

  const avatarFallback = user.name!.charAt(0).toUpperCase();
  const handleSubmit = async () => {
    await signOut();
    router.push("/auth");
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative" asChild>
        <Avatar className="size-10 rounded-md hover:opacity-75 cursor-pointer transition-opacity duration-150">
          <AvatarImage alt={user.name!} src={user.image!} />
          <AvatarFallback className="text-neutral-300 bg-neutral-950">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={handleSubmit} className="h-10">
          <LogOut className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
