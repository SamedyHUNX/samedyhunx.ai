"use client";

import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type PostCardProps = {
  post: {
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
};

export const PostCard = ({ post }: PostCardProps) => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(post._count.likes);
  const [likeLoading, setLikeLoading] = useState(true);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.image || ""} />
            <AvatarFallback>{post.author.name?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <CardTitle className="text-xl">
          <Link href={`/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center space-x-1"
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
          className="flex items-center space-x-1"
        >
          <MessageCircle />
          <span>{post._count.comments}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
