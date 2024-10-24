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

    return workspaceId;
  },
});
