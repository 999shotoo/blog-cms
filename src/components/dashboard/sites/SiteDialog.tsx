"use client"

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SiteForm from "./SiteForm";

export default function SiteDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="ms-auto">
          Create Site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Site</DialogTitle>
          <DialogDescription>
            Create a new site to manage your blog
          </DialogDescription>
        </DialogHeader>
        <SiteForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
