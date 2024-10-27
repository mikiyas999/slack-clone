"use client";

import { UserButton } from "@/app/features/auth/components/userButton";
import { useGetChannels } from "@/app/features/channels/api/useGetchannels";
import { useChannelModalState } from "@/app/features/channels/store/useChannelModalState";
import { useGetMember } from "@/app/features/members/api/useGetmembers";
import { useGetWorkspaceById } from "@/app/features/workspaces/api/useGetWorkspaceById";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { TriangleAlert } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const [open, setOpen] = useChannelModalState();

  const workspaceId = useWorkspaceId();

  const { member, isLoading: memberLoading } = useGetMember({ workspaceId });
  const { channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { workspace, isLoading: workspaceLoading } = useGetWorkspaceById({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      memberLoading ||
      !member ||
      !workspace
    )
      return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    open,
    router,
    member,
    setOpen,
    isAdmin,
    channelId,
    workspace,
    workspaceId,
    memberLoading,
    channelsLoading,
    workspaceLoading,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading) {
    return (
      <main className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <div className="loader"></div>
      </main>
    );
  }

  if (!workspace || !member) {
    return (
      <main className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-8 text-rose-500" />
        <span className="text-neutral-500 text-sm font-medium">
          Workspace not found
        </span>
      </main>
    );
  }
  return (
    <main className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-8 text-rose-500" />
      <span className="text-neutral-500 text-sm font-medium">
        No channels found
      </span>
    </main>
  );
};

export default WorkspaceIdPage;
