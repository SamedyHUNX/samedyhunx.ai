"use client";

import CommentSection from "@/components/customs/comment-section";
import { Loading } from "@/components/customs/loading";
import { NotFound } from "@/components/customs/not-found";
import { PostCard, PostCardProps } from "@/components/customs/post-card";
import { ReturnHome } from "@/components/customs/return-home";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetailsPage() {
  const params = useParams();
  const [post, setPost] = useState<PostCardProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string);
    }
  }, [params.id]);

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`);

      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.error("Failed to fetch the post: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ReturnHome />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <PostCard post={post} showFullContent />
          <CommentSection postId={post.id} />
        </div>
      </main>
    </div>
  );
}
