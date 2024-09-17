import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react"; // Import the Undo2 component correctly
import Image from "next/image";

export default function SignUpPage() {
  return (
    <>
      <div className="relative">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
          <Link href={`/`}>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden xl:block bg-primary-foreground rounded-xl m-4 overflow-hidden">
          <Image
            src={"/login.jpg"}
            alt={""}
            width={1000}
            height={720}
            className="rounded-xl m-4 max-h-[96vh]"
            style={{
              objectFit: "cover",
              objectPosition: "end",
            }}
          />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12">
          <SignUp />
        </div>
      </div>
    </>
  );
}
