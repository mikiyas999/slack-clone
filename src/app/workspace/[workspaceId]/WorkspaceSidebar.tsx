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
import { useMemberId } from "@/hooks/useMemberId";
import { useChannelId } from "@/hooks/useChannelId";
import { useChannelModalState } from "@/app/features/channels/store/useChannelModalState";
import { useGetAllMembers } from "@/app/features/members/api/useGetAllMembers";
import { useGetChannels } from "@/app/features/channels/api/useGetchannels";
import { useGetMember } from "@/app/features/members/api/useGetmembers";
import { WorkspaceSection } from "./WorkSpaceSecton";
import { UserItem } from "./userItem";

const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const [_open, setOpen] = useChannelModalState();

  const { members, isLoading: isLoadingAllMembers } = useGetAllMembers({
    workspaceId,
  });
  const { channels, isLoading: isLoadingChannels } = useGetChannels({
    workspaceId,
  });
  const { member, isLoading: isLoadingMember } = useGetMember({ workspaceId });
  const { workspace, isLoading: isLoadingWorkspace } = useGetWorkspaceById({
    workspaceId,
  });

  if (isLoadingWorkspace || isLoadingWorkspace) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!workspace || !member) {
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
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member!.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem id="threads" label="Threads" icon={MessageSquareText} />
        <SidebarItem id="drafts" label="Drafts & Sent" icon={SendHorizonal} />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channels"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            id={item._id}
            key={item._id}
            icon={HashIcon}
            label={item.name}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New Direct Messages"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            id={item._id}
            key={item._id}
            label={item.user.name}
            image={item.user.image}
            variant={memberId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </aside>
  );
};

export default WorkspaceSidebar;
