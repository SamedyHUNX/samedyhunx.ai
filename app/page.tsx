"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AuthButton } from "@/components/customs/auth-button";
import { ProfileCard } from "@/components/customs/profile-card";
import { PostCard, PostCardProps } from "@/components/customs/post-card";
import { Navbar } from "@/components/customs/navbar";

export default function HomePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostCardProps[]>([]);
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
      <Navbar isAdmin={isAdmin} />
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
            <PostCard key={post.id} post={post} showFullContent={false} />
          ))}
        </div>
      )}
    </div>
  );
}
