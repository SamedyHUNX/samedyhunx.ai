import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export const ReturnHome = () => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          asChild
          className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nevermind
          </Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};
