import Quill from "quill";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useChannelId } from "@/hooks/useChannelId";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";

import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type CreateMessageValues = {
  body: string;
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  image: Id<"_storage"> | undefined;
};

export const ChatInput = ({ placeholder }: { placeholder: string }) => {
  const [editorKey, setEditoryKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const innerRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      innerRef?.current?.enable(false);

      const values: CreateMessageValues = {
        body,
        channelId,
        workspaceId,
        image: undefined,
      };

      // Clear the after submitting the message
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
      innerRef?.current?.enable(true);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        innerRef={innerRef}
        disabled={isPending}
        onSubmit={handleSubmit}
        placeholder={placeholder}
      />
    </div>
  );
};
