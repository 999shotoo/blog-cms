import React from "react";
import Link from "next/link";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar(props: { SiteName: string }) {
  return (
    <header className="px-4 py-8 lg:px-6 h-14 flex items-center bg-primary-foreground m-2 rounded-xl">
      <Link className="flex items-center justify-center" href={`/`}>
        <PenTool className="h-6 w-6 mr-2" />
        <span className="font-bold text-2xl">{props.SiteName}</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium" href={`${process.env.SITE_URL}`}>
          <Button variant="default" className="rounded-xl">
            Start Writing
          </Button>
        </Link>
      </nav>
    </header>
  );
}
