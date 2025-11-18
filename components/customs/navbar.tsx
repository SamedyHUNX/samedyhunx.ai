import Link from "next/link";
import { Search, X, Plus } from "lucide-react";
import { AuthButton } from "./auth-button";
import SearchBar from "./search";
import { useState } from "react";

export const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          href={"/"}
          className="font-light text-3xl text-neutral-900 hover:text-neutral-700 transition-colors tracking-tighter"
        >
          <h1>samedyhunx.tech</h1>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <div className="flex items-center">
            {!searchOpen ? (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <SearchBar onClose={() => setSearchOpen(false)} />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          {isAdmin && (
            <Link href="/admin/create">
              <Plus className="h-5 w-5" />
            </Link>
          )}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
