import React from "react";
import Link from "next/link";
import { PenTool } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="px-4 py-8 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <PenTool className="h-6 w-6 mr-2" />
        <span className="font-bold text-2xl">
          Pixel<span className="font-light text-foreground/75">CMS</span>
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <SignedOut>
          <Button>
            <Link className="text-sm font-medium" href="/sign-up">
              Sign Up
            </Link>
          </Button>
          <Button variant="outline">
            <Link className="text-sm font-medium" href="/sign-in">
              Sign In
            </Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant="outline">
            <Link className="text-sm font-medium" href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
