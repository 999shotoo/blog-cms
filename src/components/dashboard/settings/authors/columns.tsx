"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { deleteAuthor } from "@/server/actions/delete-author";
import { ButtonLoading } from "@/components/ui/button-loading";

export type Author = {
  id: string;
  name: string;
  email: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm ">
        {row.getValue("email") ? (
          <a
            href={`mailto:${row.getValue("email")}`}
            className="underline-offset-4 hover:underline"
          >
            {row.getValue("email")}
          </a>
        ) : (
          <span className="italic">No email</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-sm ">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const author = row.original;
      const [open, setOpen] = React.useState(false);
      const [isLoading, setIsLoading] = React.useState(false);
      const { toast } = useToast();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(author.name)}
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem className="text-destructive hover:!bg-destructive hover:!text-foreground">
                  Delete author
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Author</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this author?
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
                        const res = await deleteAuthor(author.id);

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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
