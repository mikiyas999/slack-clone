import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const populateMember = (ctx: QueryCtx, userId: Id<"users">) => {
  return ctx.db.get(userId);
};

export const get = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return null;

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return null;

    return member;
  },
});

export const getAll = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return [];

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return [];

    const data = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
      .collect();

    const members = [];

    for (const member of data) {
      const user = await populateMember(ctx, member.userId);

      if (user) {
        members.push({
          ...member,
          user,
        });
      }
    }

    return members;
  },
});
