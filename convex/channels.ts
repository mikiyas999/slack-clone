import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) return [];

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return [];

    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
      .collect();

    return channels;
  },
});
