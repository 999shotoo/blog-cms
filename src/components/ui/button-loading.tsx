import { LoaderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({ children }: { children: React.ReactNode }) {
  return (
    <Button disabled>
      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
