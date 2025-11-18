import Link from "next/link";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { AuthButton } from "./auth-button";

export const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          href={"/"}
          className="font-cormorantGaramond font-light text-4xl text-neutral-900 hover:text-neutral-700 transition-colors"
        >
          <h1>samedyhunx.ai</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Button asChild>
              <Link href="/admin/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          )}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
