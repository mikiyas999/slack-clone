import { useGetWorkspaceById } from "@/app/features/workspaces/api/useGetWorkspaceById";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";

import React from "react";
import { SidebarItem } from "./sidebaritem";
import {
  Loader,
  HashIcon,
  AlertTriangle,
  SendHorizonal,
  MessageSquareText,
} from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { workspace, isLoading: isLoadingWorkspace } = useGetWorkspaceById({
    workspaceId,
  });

  if (isLoadingWorkspace) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-neutral-300 text-sm">
          You are not a member of this workspace
        </p>
      </div>
    );
  }
  return (
    <aside className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={true} />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem id="threads" label="Threads" icon={MessageSquareText} />
        <SidebarItem id="drafts" label="Drafts & Sent" icon={SendHorizonal} />
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
