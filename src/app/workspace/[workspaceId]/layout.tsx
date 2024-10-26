"use client";
import React from "react";
import ToolBar from "./ToolBar";
import { Sidebar } from "./Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkspaceSidebar from "./WorkspaceSidebar";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <ToolBar />
      <main className="flex  h-[calc(100%-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="workspace-layout"
        >
          <ResizablePanel
            minSize={11}
            defaultSize={20}
            className="bg-[#5e2c5f]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            minSize={20}
            defaultSize={80}
            className="bg-neutral-50"
          >
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default WorkspaceLayout;
