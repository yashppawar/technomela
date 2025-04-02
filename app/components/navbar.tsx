import Image from "next/image";
import Link from "next/link";
import { LogIn, Shield, UserPlus, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center text-2xl gap-3 font-bold text-white"
        >
          <Image
            className="rounded-full bg-white w-16 h-16"
            src="/assets/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />
          <span className="">AI Based Resume Analyzer</span>
        </Link>
      </div>
    </nav>
  );
}
