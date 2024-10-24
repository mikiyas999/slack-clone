"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserButton } from "./features/auth/components/userButton";
import { useGetWorkspaces } from "./features/workspaces/api/useGetWorkspaces";
import { useEffect, useMemo } from "react";
import { useWorkspaceModalState } from "./features/workspaces/store/useWorkSpaceModalState";

export default function Home() {
  const [isOpen, setIsOpen] = useWorkspaceModalState();

  const { workspaces, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => workspaces?.[0]?._id, [workspaces]);

  const { signOut } = useAuthActions();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
      console.log("redirect to workspace id");
    } else if (!isOpen) {
      setIsOpen(true);
    }
  }, [isLoading, workspaceId, isOpen, setIsOpen]);

  const handleSubmit = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div>
      Logged in
      <UserButton />
    </div>
  );
}
