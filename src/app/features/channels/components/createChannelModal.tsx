import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useChannelModalState } from "../store/useChannelModalState";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateChannel } from "../api/useCreateChannel";

export const CreateChannelModal = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useChannelModalState();
  const [channelName, setChannelName] = useState("");
  const { mutate, isPending } = useCreateChannel();

  const handleClose = () => {
    setOpen(false);
    setChannelName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setChannelName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name: channelName,
        workspaceId,
      },
      {
        onSuccess: (channelId) => {
          toast.success("Channel created successfully");
          handleClose();
          // router.push(`/workspace/${workspaceId}/channel/${channelId}`);
        },
        onError: () => {
          toast.error("Failed to create channel");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            required
            autoFocus
            type="text"
            minLength={3}
            maxLength={80}
            className="w-full"
            value={channelName}
            disabled={isPending}
            onChange={handleChange}
            placeholder="e.g. 'General'"
          />
          <aside className="flex justify-end">
            <Button type="submit" disabled={false}>
              Create
            </Button>
          </aside>
        </form>
      </DialogContent>
    </Dialog>
  );
};
