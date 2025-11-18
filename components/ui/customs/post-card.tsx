import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Button } from "../button";
import { Heart, MessageCircle } from "lucide-react";

type PostCardProps = {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      image: string;
    };
    createdAt: string;
  };
};

export const PostCard = ({ post }: PostCardProps) => {
  const likeLoading = false;
  const liked = true;
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
          <span>10</span>
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center space-x-1"
        >
          <MessageCircle />
          <span>5</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
