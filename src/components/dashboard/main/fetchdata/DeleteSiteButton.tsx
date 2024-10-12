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
import { deleteSite } from "@/server/actions/delete-site";
import { useToast } from "@/hooks/use-toast";

export default function DeleteSiteButton({ siteId }: { siteId: string }) {
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
          Delete site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Site</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this site?
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
                const res = await deleteSite(siteId);

                if (!res.success) {
                  toast({
                    title: "Error deleting site",
                    description: res.message,
                    variant: "destructive",
                  });
                  setIsLoading(false);
                  return;
                }

                toast({
                  title: "Site deleted successfully",
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
