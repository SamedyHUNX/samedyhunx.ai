"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setQuery(searchTerm);

    if (searchTerm.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
    onClose?.();
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && (
        <div className="absolute mt-2 text-sm text-gray-500">Searching...</div>
      )}

      {query.trim().length > 0 && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((post: any) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="p-4 hover:bg-gray-100 cursor-pointer border-b"
              >
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.content.substring(0, 150)}...
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No posts found for "{query}"</p>
              <p className="text-sm mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
