import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
  return Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
};

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    const joinCode = generateCode();

    const workspaceId = await ctx.db.insert("workspaces", {
      name,
      userId,
      joinCode,
    });
    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin",
    });

    return workspaceId;
  },
});

export const getById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return null;

    return await ctx.db.get(workspaceId);
  },
});

export const newJoinCode = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Client is not authenticated!");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const joinCode = generateCode();

    await ctx.db.patch(workspaceId, { joinCode });

    return workspaceId;
  },
});

export const update = mutation({
  args: {
    name: v.string(),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { workspaceId, name }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(workspaceId, { name });

    return workspaceId;
  },
});

export const remove = mutation({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const [members, channels, conversations, messages, reactions] =
      await Promise.all([
        ctx.db
          .query("members")
          .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
          .collect(),
        ctx.db
          .query("channels")
          .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
          .collect(),
        ctx.db
          .query("conversations")
          .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
          .collect(),
        ctx.db
          .query("messages")
          .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
          .collect(),
        ctx.db
          .query("reactions")
          .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
          .collect(),
      ]);

    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    for (const channel of channels) {
      await ctx.db.delete(channel._id);
    }

    for (const conversation of conversations) {
      await ctx.db.delete(conversation._id);
    }

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    for (const reaction of reactions) {
      await ctx.db.delete(reaction._id);
    }

    await ctx.db.delete(workspaceId);

    return workspaceId;
  },
});
