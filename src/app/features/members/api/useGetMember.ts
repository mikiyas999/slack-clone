import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";

export const useGetMember = ({
  workspaceId,
}: {
  workspaceId: Id<"workspaces">;
}) => {
  const member = useQuery(api.members.get, { workspaceId });
  const isLoading = member === undefined;

  return { member, isLoading };
};
