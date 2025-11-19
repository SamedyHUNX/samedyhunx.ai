"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/customs/profile-card";
import { PostCard, PostCardProps } from "@/components/customs/post-card";
import { Navbar } from "@/components/customs/navbar";
import { Loading } from "@/components/customs/loading";
import { Footer } from "@/components/customs/footer";

export default function HomePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "ADMIN";

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

  if (loading) {
    return <Loading />;
  }

  if (!posts) {
    <div className="text-center text-muted-foreground">
      No posts yet. {isAdmin && "Create your first post!"}
    </div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar isAdmin={isAdmin} />
      <ProfileCard
        image="/profile.jpg"
        name="Samedy Hun"
        description="I like to build AI system from scratch 🧠🤖💥"
        gitHubLink="https://github.com/SamedyHUNX"
        xLink="https://x.com/samedyhunx"
        email="samedyhunx@gmail.com"
      />

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} showFullContent={false} />
        ))}
      </div>
      <Footer
        year={2025}
        name="Vadhna Samedy Hun"
        xLink="https://x.com/samedyhunx"
        gitHubLink="https://github.com/SamedyHUNX"
      />
    </div>
  );
}
