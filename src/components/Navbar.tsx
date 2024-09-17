import React from "react";
import Link from "next/link";
import { Box } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Profile } from "./profile/Profile";

export default function Navbar() {
  return (
    <header className="px-4 py-8 lg:px-6 h-14 flex items-center bg-primary-foreground m-2 rounded-xl">
      <Link className="flex items-center justify-center" href="/">
        <Box className="h-6 w-6 mr-2" />
        <span className="font-bold text-2xl">
          Pixel<span className="font-light text-foreground/75">CMS</span>
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <SignedOut>
          <Link className="text-sm font-medium" href="/sign-up">
            <Button variant="default" className="rounded-xl">
              SignUp
            </Button>
          </Link>
          <Link className="text-sm font-medium" href="/sign-in">
            <Button variant="outline" className="rounded-xl">
              SignIn
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link className="text-sm font-medium" href="/dashboard">
            <Button variant="outline" className="rounded-xl">
              Dashboard
            </Button>
          </Link>
          <Profile />
        </SignedIn>
      </nav>
    </header>
  );
}
