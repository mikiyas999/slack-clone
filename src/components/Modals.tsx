"use client";

import { CreateChannelModal } from "@/app/features/channels/components/createChannelModal";
import CreateWorkspaceModal from "@/app/features/workspaces/components/createWorkspaceModal";
import { useState, useEffect } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  // prevent hydration error
  useEffect(() => {
    console.log("Mounted");
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </>
  );
};
