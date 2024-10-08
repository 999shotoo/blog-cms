import Link from "next/link";
import React from "react";

export default function Footer(props: { sitename: string }) {
  return (
    <footer className="m-2">
      <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 bg-primary-foreground rounded-xl ">
        <p className="text-xs ">
          © 2024 {props.sitename} Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href={`${process.env.SITE_URL}`}
          >
            Made with ❤️ by PixelCMS
          </Link>
        </nav>
      </div>
    </footer>
  );
}
