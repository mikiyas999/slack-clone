import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";

const WorkspaceHeader = ({
  isAdmin,
  workspace,
}: {
  isAdmin: boolean;
  workspace: Doc<"workspaces">;
}) => {
  return <div>WorkspaceHeader</div>;
};

export default WorkspaceHeader;
