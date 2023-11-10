"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/app/ui/button";
import { PowerIcon } from "@heroicons/react/24/outline";

export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="h-[48px] rounded-md p-3 text-sm font-medium md:p-2 md:px-3"
      aria-disabled={pending}
      disabled={pending}
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </Button>
  );
}
