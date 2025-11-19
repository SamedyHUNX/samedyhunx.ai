import Link from "next/link";
import { Search, Plus, Twitter } from "lucide-react";
import { AuthButton } from "./auth-button";
import SearchBar from "./search";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-gray-100 dark:bg-gray-900 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 h-[100px]">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between h-full">
        <Link
          href={"/"}
          className="font-light text-3xl text-neutral-900 dark:text-neutral-100 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors tracking-tighter"
        >
          <h1>samedyhunx.tech</h1>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <div className="flex items-center">
            {!searchOpen ? (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <SearchBar onClose={() => setSearchOpen(false)} />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>
          {isAdmin && (
            <Link href="/admin/create">
              <Plus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </Link>
          )}
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
