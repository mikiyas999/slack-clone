import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";

interface UseGetChannelByIdProps {
  channelId: Id<"channels">;
}

export const useGetChannelById = ({ channelId }: UseGetChannelByIdProps) => {
  const channel = useQuery(api.channels.getById, { channelId });
  const isLoading = channel === undefined;

  return { channel, isLoading };
};
