"use client";

import { useParams } from "next/navigation";
import React from "react";

const WorkspaceIdPage = () => {
  const params = useParams();
  console.log(params);
  return <div>workspace id: {params.workspaceId}</div>;
};

export default WorkspaceIdPage;
