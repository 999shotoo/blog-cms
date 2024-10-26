"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ButtonLoading } from "@/components/ui/button-loading";
import { useToast } from "@/hooks/use-toast";
import { deleteDocument } from "@/server/actions/delete-document";

export default function DeleteDocumentButton({
  documentId,
}: {
  documentId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">
          <span>
            <Trash className="mr-2 h-4 w-4 text-destructive" />
          </span>
          Delete document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this document?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {isLoading ? (
            <ButtonLoading>Deleting...</ButtonLoading>
          ) : (
            <Button
              onClick={async () => {
                setIsLoading(true);
                const res = await deleteDocument(documentId);

                if (!res.success) {
                  toast({
                    title: "Error deleting document",
                    description: res.message,
                    variant: "destructive",
                  });
                  setIsLoading(false);
                  return;
                }

                toast({
                  title: "Document deleted successfully",
                  description: res.message,
                });
                setOpen(false);
                setIsLoading(false);
              }}
            >
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
