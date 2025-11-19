"use client";

import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MarkdownRenderer } from "./markdown-renderer";

export type PostCardProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
  _count: {
    comments: number;
    likes: number;
  };
};

export const PostCard = ({
  post,
  showFullContent = false,
}: {
  post: PostCardProps;
  showFullContent: boolean;
}) => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(post._count.likes);
  const [likeLoading, setLikeLoading] = useState(true);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!session?.user?.id) {
        setLikeLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/posts/${post.id}/like-status`);
        if (response.ok) {
          const data = await response.json();
          setLiked(data.liked);
        }
      } catch (error) {
        console.error("Failed to fetch like status", error);
      } finally {
        setLikeLoading(false);
      }
    };

    fetchLikeStatus();
  }, [post.id, session?.user?.id]);

  const handleLike = async () => {
    if (!session) return;

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
      });

      const data = await response.json();

      setLiked(data.liked);
      setLikedCount((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Failed to toggle like: ", error);
    }
  };

  const content = showFullContent
    ? post.content
    : post.content.slice(0, 200) + (post.content.length > 200 ? "..." : "");
  return (
    <Card className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
          {showFullContent ? (
            post.title
          ) : (
            <Link
              href={`/posts/${post.id}`}
              className="hover:underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              {post.title}
            </Link>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-800 dark:text-gray-200">
        <MarkdownRenderer content={content} />
      </CardContent>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.image || ""} />
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              {post.author.name?.[0] || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {post.author.name}
            </p>
            <p className="text-xs text-muted-foreground dark:text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          onClick={handleLike}
          disabled={!session}
        >
          <Heart
            className={`h-4 w-4 ${
              likeLoading
                ? "animate-pulse"
                : liked
                ? "fill-red-600 text-red-500"
                : ""
            }`}
          />
          <span>{likedCount}</span>
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <MessageCircle />
          <span>{post._count.comments}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
