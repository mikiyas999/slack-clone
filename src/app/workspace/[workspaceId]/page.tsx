"use client";

import { UserButton } from "@/app/features/auth/components/userButton";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useParams } from "next/navigation";
import React from "react";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  return (
    <div className="p-6">
      <div>workspace id: {workspaceId}</div>
    </div>
  );
};

export default WorkspaceIdPage;
