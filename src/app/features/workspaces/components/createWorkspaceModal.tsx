import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useWorkspaceModalState } from "../store/useWorkSpaceModalState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCreateWorkspace } from "../api/useCreateWorkspaces";
import { toast } from "sonner";

const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useWorkspaceModalState();
  const { mutate, isPending } = useCreateWorkspace();
  const [workspaceName, setWorkspaceName] = useState("");

  const handleClose = () => {
    setOpen(false);
    setWorkspaceName("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name: workspaceName },
      {
        onSuccess: (workspaceId) => {
          toast.success("Workspace created");
          router.push(`/workspace/${workspaceId}`);
          setOpen(false);
          setWorkspaceName("");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create your workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            required
            autoFocus
            type="text"
            minLength={3}
            maxLength={80}
            className="w-full"
            disabled={isPending}
            value={workspaceName}
            placeholder="Workspace name e.g 'Acme Corp'"
            onChange={(e) => setWorkspaceName(e.target.value)}
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

export default CreateWorkspaceModal;
