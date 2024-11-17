"use client";

import { useChannelId } from "@/hooks/useChannelId";

import { Loader2, TriangleAlert } from "lucide-react";

import { useGetChannelById } from "@/app/features/channels/api/useGetChannelById";
import { Header } from "./Header";
import { ChatInput } from "./ChatInput";

export default function ChannelPage() {
  const channelId = useChannelId();

  const { channel, isLoading } = useGetChannelById({ channelId });

  if (isLoading) {
    return (
      <main className="h-full flex-1 flex items-center justify-center">
        <div className="loader"></div>
      </main>
    );
  }

  if (!channel) {
    return (
      <main className="h-full flex-1 flex items-center justify-center flex-col gap-y-2">
        <TriangleAlert className="size-8 text-rose-500" />
        <span className="text-neutral-500 text-sm font-medium">
          Channel not found
        </span>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-full">
      <Header channelName={channel.name} />
      <div className="flex-1" />
      <ChatInput placeholder="Send a message" />
    </main>
  );
}
