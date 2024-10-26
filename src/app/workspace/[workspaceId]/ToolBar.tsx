"use client";

import React, { useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InfoIcon, Search } from "lucide-react";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useGetWorkspaceById } from "@/app/features/workspaces/api/useGetWorkspaceById";

const ToolBar = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const workspaceId = useWorkspaceId();

  const { workspace } = useGetWorkspaceById({ workspaceId });

  return (
    <header className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />

      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-neutral-300 mr-2" />
          <span className="text-neutral-300 text-xs">
            Search {workspace?.name}
          </span>
        </Button>
      </div>
      <nav className="ml-auto flex-1 flex items-center justify-end">
        <Button size="sm" variant="transparent">
          <InfoIcon className="size-5 text-neutral-300 mr-2" />
        </Button>
      </nav>
    </header>
  );
};

export default ToolBar;
