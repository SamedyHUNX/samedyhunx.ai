"use client";

import { AuthButton } from "@/components/ui/customs/auth-button";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ProfileCard } from "@/components/ui/customs/profile-card";
import { PostCard } from "@/components/ui/customs/post-card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Post } from "./generated/prisma";

export default function HomePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts: ", error);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
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
      <ProfileCard
        image="/profile.jpg"
        name="Samedy Hun"
        description="I am a full-stack and an aspiring AI engineer 🧠🤖💥"
        gitHubLink="https://github.com/SamedyHUNX"
        xLink=""
        email="samedyhunx@gmail.com"
      />

      {loading ? (
        <div className="text-center">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No posts yet. {isAdmin && "Create your first post!"}
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
